import * as socketio 	from 'socket.io';
import serialport 	from '../core/serialport';

import test			from '../core/test';

export default function(server) {
	console.log("BOOT: socket");

	const socket = socketio(server);

	const channel = {
		'serialport': socket.of('/serialport'),
		'test': socket.of('/test')
	};

	serialport.on('data', (data) => channel['serialport'].emit('data', data));
	serialport.on('update_ports', (ports) => channel['serialport'].emit('upate_ports', ports));
	serialport.on('error', (error) => channel['serialport'].emit('error', error));

	test.on('test', (test) => channel['test'].emit('test', test));

	if (process.env.TEST) { 
		setInterval(() => {
            channel['serialport'].emit('data', "data "+JSON.stringify({"time":new Date().getTime(), "channel1": Math.floor((Math.random() * 6000) + 1), "channel2": Math.floor((Math.random() * 10) + 1) })); 
		}, 100);
	}
}

