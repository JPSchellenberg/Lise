var serialport = require('serialport');
var websocket = require('socket.io')(3001);

var connection = new serialport.SerialPort(
				'/dev/ttyATH0', 
				{
					baudRate: 115200,
					parser: serialport.parsers.readline("\n"),
					autoOpen: true
				});

connection.on('data', broadcast_data);

websocket.on('connection', handle_connection);

function handle_connection(socket) {
	socket.on('write', write_serialport);
}

function write_serialport(data) {
	connection.write(data);
}

function broadcast_data(data) {
	websocket.emit('data', data);
};

write_serialport('lisestart\n');