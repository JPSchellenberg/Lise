import * as socketio 	from 'socket.io';
import serialport 	from '../core/serialport';
import sketch			from '../core/sketch';

export default function(server) {
	console.log("BOOT: socket");

	const socket = socketio(server);

	const channel = {
		'serialport': socket.of('/serialport'),
		'sketch': socket.of('/sketch')
	};

	serialport.on('data', (data) => channel['serialport'].emit('data', data));
	serialport.on('update_ports', (ports) => channel['serialport'].emit('update_ports', ports));
	serialport.on('error', (error) => channel['serialport'].emit('error', error));
	serialport.on('close', () => channel['serialport'].emit('close', serialport.connection));
	serialport.on('open', (connection) => channel['serialport'].emit('open', connection));

	sketch.on('version', (version) => channel['sketch'].emit('version', version));
	sketch.on('gain', (gain) => channel['sketch'].emit('gain', gain));
	sketch.on('samplerate', (samplerate) => channel['sketch'].emit('samplerate', samplerate));

	if (process.env.TEST) { 
		setInterval(() => {
            channel['serialport'].emit('data', "data "+JSON.stringify({"time":new Date().getTime(), "channel1": Math.floor((Math.random() * 6000) + 1), "channel2": Math.floor((Math.random() * 10) + 1) })); 
		}, 100);
	}
}

