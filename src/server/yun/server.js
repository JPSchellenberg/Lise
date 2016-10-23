var http = require('http');
var fs = require('fs');
var path = require('path');

var socketio = require('socket.io');
var serialport = require('serialport');

var server = http.createServer(function (request, response) {

    var filePath = __dirname+'/app' + request.url;
    if (filePath == __dirname+'/app/')
        filePath = dirname+'/app/index.html';

    var extname = path.extname(filePath);
    var contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;      
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.wav':
            contentType = 'audio/wav';
            break;
    }

    fs.readFile(filePath, function(error, content) {
        if (error) {
            if(error.code == 'ENOENT'){
                fs.readFile('./404.html', function(error, content) {
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                response.end(); 
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });

}).listen(3000);

var socketServer = socketio(server);

var serialConnection = new serialport.SerialPort( (process.env.SERIALPORT ? process.env.SERIALPORT : '/dev/ttyATH0'), { // /dev/ttyATH0 is standard port on arduino yun - for development use local server with: "SERIALPORT=/dev/cu.usbmodem1421 node server.js"
  baudRate: 9600,
  parser: serialport.parsers.readline("\n")
});

function broadcast(data) {
    socketServer.emit('data', data);
}

serialConnection.on('data', broadcast);

console.log('Server running at http://127.0.0.1:3000/');
