var http = require('http');
var socketio = require('socket.io');

var server = http.createServer(function (request, response) {
}).listen(3000);

var socketServer = socketio(server);

setInterval(() => {
	socketServer.emit('data', "data {\"time\":"+new Date().getTime()+",\"channel1\":"+Math.random()*1000+",\"channel2\":"+Math.random()*1000+"}");
}, 10);

console.log('Server running at http://127.0.0.1:3000/');
