/// <reference path="../../typings/index.d.ts" />
import * as express		from 'express';
import * as socketio 	from 'socket.io';
import * as serialport	from 'serialport';
import * as os			from 'os';

import boot 			from './boot';

class Core {
	constructor() {
		console.log('CORE: BOOT: express');

		this.server = express();
		boot(this.server);

		this.socket = socketio(this.server.listen( process.env.PORT || 3000, function () {
  			console.log('CORE: Server running on Port '+ (process.env.PORT || 3000) );
		}));


		console.log("CORE: BOOT: websocket channels")
		this.socket_channels = new Array();
		this.socket_channels.push( this.socket.of('/serialport') );

		console.log("CORE: BOOT: serialports")
		this.ports = new Array();
		if (os.type() === 'Linux' && os.arch() === 'mips') {
			console.log("CORE: BOOT: YUN: Serialport -> only serialport is /dev/ttyATH0");
			console.log("CORE: BOOT: YUN: Serialport -> default connection to /dev/ttyATH0 will be established");
			
			this.ports.push(<serialport.portConfig>{
    			"comName": "/dev/ttyATH0",
    			"manufacturer": "Arduino Srl"
  			});

			this.setConnection(new serialport.SerialPort(
				'/dev/ttyATH0', {
				baudRate: 9600,
				parser: serialport.parsers.readline("\n")
			}));

		} else {
			console.log("CORE: BOOT: Serialport -> start polling ports");
			console.log("CORE: BOOT: Serialport -> no default connection will be established");
			setInterval(() => {
				serialport.list((err: string, ports: serialport.portConfig[]) => {
					if (err) { }

					if (ports.length !== this.ports.length) { this.socket_channels.filter(channel => channel.name === '/serialport')[0].emit('list', ports) }
					this.ports = ports;
				});
			}, 1000);
		}
	}

	connection: serialport.SerialPort;
	server: express.Application;
	socket: SocketIO.Server;
	ports: Array<serialport.portConfig>;
	
	socket_channels: Array<SocketIO.Namespace>;

	setConnection(connection: serialport.SerialPort): boolean { 
		try {
			this.connection = connection; 
			const self = this;
			this.connection.on('data', 
				(data) => 
				this.socket_channels
				.filter(channel => channel.name === '/serialport')[0]
				.emit('data', data)
			);
			this.connection.on('error', 
				(err) => 
				this.socket_channels
				.filter(channel => channel.name === '/serialport')[0]
				.emit('error', err)
			);
			this.connection.on('open', 
				() => 
				this.socket_channels
				.filter(channel => channel.name === '/serialport')[0]
				.emit('open', self.connection )
			);
			this.connection.on('close', 
				() => 
				this.socket_channels
				.filter(channel => channel.name === '/serialport')[0]
				.emit('close', self.connection )
			);

			setInterval(() => {
				this.socket_channels.filter(channel => channel.name === '/serialport')[0].emit('heartbeat', new Date().getTime());
			},1000);

			console.log('CORE: SERIALPORT: new connection to ',this.connection);
			return true;
		} catch (err) {
			return false;
		}
	}

	getConnection(): serialport.SerialPort { return this.connection; }

	closeConnection(): boolean {
		try {
			this.connection.close();
			this.connection = undefined;
			return true;
		} catch(err) {
			return false;
		}
	}

	getPorts(): Array<serialport.portConfig> { return this.ports; }
	boot(): void { console.log('booting core') }
}

export default new Core();