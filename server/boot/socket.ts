import * as socketio 	from 'socket.io';
import serialport 	from '../core/serialport';
import * as os 			from 'os';

import * as _debug 		from 'debug';

const debug = _debug('boot:socket');

export default function(server) {
	debug('booting socket');

	const socket = socketio(server);

	const channel = {
		'serialport': socket.of('/serialport'),
		'system': socket.of('/system')
	};

	serialport.on('data', (data) => channel['serialport'].emit('data', data));
	serialport.on('update_ports', (ports) => channel['serialport'].emit('update_ports', ports));
	serialport.on('error', (error) => channel['serialport'].emit('error', error));
	serialport.on('close', () => channel['serialport'].emit('close', serialport.connection));
	serialport.on('open', (connection) => channel['serialport'].emit('update_connection', connection));
	serialport.on('update', (update) => channel['serialport'].emit('update', update));
	serialport.on('sketch', (sketch) => channel['serialport'].emit('sketch', sketch));
	serialport.on('sensor', (sensor) => channel['serialport'].emit('sensor', sensor));
	
	channel['serialport'].on('connection', (socket) => {
		socket.emit('update_connection', serialport.connection );
		socket.emit('update_ports', serialport.ports );
		socket.emit('sensor', serialport.sensors);
		socket.emit('sketch', serialport.sketch);
	});

	channel['system'].on('connection', (socket) => {
		socket.emit('os', {
			"arch": os.arch(),
			"platform": os.platform()
		});
	});

	if (process.env.TEST) { 
		setInterval(() => {
            channel['serialport'].emit('data', "data "+JSON.stringify({"time":new Date().getTime(), "channel1": Math.floor((Math.random() * 6000) + 1), "channel2": Math.floor((Math.random() * 10) + 1) })); 
		}, 100);
	}
}

