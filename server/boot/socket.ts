import * as socketio 	from 'socket.io';
import serialport 	from '../core/serialport';
import sketch			from '../core/sketch';
import * as os 			from 'os';

export default function(server) {
	console.log("BOOT: socket");

	const socket = socketio(server);

	const channel = {
		'serialport': socket.of('/serialport'),
		'sketch': socket.of('/sketch'),
		'general': socket.of('/general')
	};

	serialport.on('data', (data) => channel['serialport'].emit('data', data));
	serialport.on('update_ports', (ports) => channel['serialport'].emit('update_ports', ports));
	serialport.on('error', (error) => channel['serialport'].emit('error', error));
	serialport.on('close', () => channel['serialport'].emit('close', serialport.connection));
	serialport.on('open', (connection) => channel['serialport'].emit('update_connection', connection));
	channel['serialport'].on('connection', (socket) => {
		socket.emit('update_connection', serialport.connection );
		socket.emit('update_ports', serialport.ports );
	});

	sketch.on('version', (version) => channel['sketch'].emit('version', version));
	sketch.on('gain', (gain) => channel['sketch'].emit('gain', gain));
	sketch.on('samplerate', (samplerate) => channel['sketch'].emit('samplerate', samplerate));
	channel['sketch'].on('connection', (socket) => {
		socket.emit('version', sketch.version);
	});

	channel['general'].on('connection', (socket) => {
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

