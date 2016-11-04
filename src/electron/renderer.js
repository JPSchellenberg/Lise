// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

// window.bootSerialport = function() {
var serialport = require('serialport');
// }
var socketConnection;

window.avrgirl = require('avrgirl-arduino');

window.flash = function(port, cb) {
	let flasher = new window.avrgirl({
		board: 'leonardo',
		port: port
	});

	flasher.flash(__dirname + '/hex/adafruit_differential.hex', (err) => {
		if (err) {
			cb('danger', err)
		} else {
			cb('success');
		}
	});
}

var express = require('express');
var bodyParser = require('body-parser');
var socketio = require('socket.io');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.get('*', express.static(__dirname));

var server = socketio.listen(app.listen(1337, () => {
	console.log('server running on 1337')
	window.portList = [];

}));

server.on('connection', (socket) => {
	console.log('new client');
	socketConnection = socket;
	socket.on('connect_port', (comName) => {
		connect(comName);
	});
	socket.on('flash', (comName) => { window.flash(comName); });
	setInterval(() => {
		serialport.list((err, ports) => {
			if (err) {
				throw new Error(err);
			}

			if (ports.length !== window.portList.length) {
				window.portList = ports;
				socketConnection.emit('portUpdate', ports);
			}
		}, 1000);

	});
});


function setupListener() {

	Connection.on('data', (data) => {
		if (data.indexOf('version') !== -1) {
			socketConnection.emit('version', JSON.parse(data.split(" ")[1]));
			socketConnection.emit('connection', 'success');
			clearTimeout(connectionTimeout);
		} else {
			socketConnection.emit('data', data);
		}

	});

	let connectionTimeout;

	Connection.on('open', () => {
		requestVersion();

		connectionTimeout = setTimeout(() => {
			socketConnection.emit('connection', 'danger')
		}, 5000);
	});

	Connection.on('close', () => {
		socketConnection.emit('connection', 'danger');
	})

}

function requestVersion() {
	Connection.write('v');
}

function connect(comName) {
	try {
		socketConnection.emit('connection', 'warning');

		Connection = new serialport.SerialPort(comName, {
			baudRate: 9600,
			parser: serialport.parsers.readline("\n")
		});

		setupListener();

	} catch (err) {
		socketConnection.emit('error', err);
	}
}