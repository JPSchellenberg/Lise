/// <reference path="../../typings/index.d.ts" />
const serialport = require('serialport-electron');
import * as EventEmitter 	from 'eventemitter3';

interface serialport {
	SerialPort: any;

}
export class Serialport extends EventEmitter {
	constructor() {
		super();

		this.mConnection = null;
		this.mPorts = new Array();

		// start polling ports:
		setInterval(() => this.poll_ports(), 1000);

	}

	private mConnection: any;
	private mPorts: Array<any>;

	public get connection(): any { return this.mConnection; }
	public get ports(): Array<any> { return this.mPorts; }

	public addPort(port: any): number { return this.mPorts.push(port); }

	public connect(comName: string): any {
		this.mConnection = new serialport.SerialPort(
				comName, {
				baudRate: 9600,
				parser: serialport.parsers.readline("\n")
			});
		this.setupListeners();
		return this.mConnection;
	}

	public closeConnection(): void {
		try {
			this.mConnection.close();
			this.mConnection = null;
		} catch(err) {}
		
	}

	private setupListeners(): void {
		if (this.mConnection) {
			this.mConnection.on('data', (data) => this.emit('data', data));
			this.mConnection.on('error', (error) => this.emit('error', error));
			this.mConnection.on('open', () => { 
				this.emit('open') 
			});
			this.mConnection.on('close', () => { 
				this.closeConnection();
				this.emit('close');
			});
		}
	}

	private poll_ports(): void {
		try {
			serialport.list((err: string, ports: any) => {
				if (err) { debugger; }

				if (ports.length !== this.mPorts.length) { this.emit('update_ports', ports); }
				this.mPorts = ports;
			});
		} catch(err) {}

	}
}

export default new Serialport();