import * as _debug 			from 'debug';

import * as serialport		from 'serialport';
import * as EventEmitter 	from 'eventemitter3';

const debug = _debug('serialport:wrapper');
const debug_event = _debug('serialport:event');
const debug_connection = _debug('serialport:connection');

export class Serialport extends EventEmitter {
	constructor() {
		super();
		debug('constructor start');

		this.mConnection = null;
		this.mPorts = new Array();
				debug('receiving sketch timed out');
			debug_event('sketch',sketch);
			debug_event('sensor', sensors);

		// start polling ports:
		setInterval(() => this.poll_ports(), 1000);

		debug('constructor end');
	}

	private mConnection: serialport.SerialPort;
	private mPorts: Array<serialport.portConfig>;

	public get connection(): serialport.SerialPort { return this.mConnection; }
	public get ports(): Array<serialport.portConfig> { return this.mPorts; }

	public addPort(port: serialport.portConfig): number { return this.mPorts.push(port); }

	public connect(comName: string): serialport.SerialPort {
		debug_connection('connecting to '+comName);

		if (this.mConnection) { this.mConnection.close(); }

		this.mConnection = new serialport.SerialPort(
			debug_connection('opening connection');
				comName, 
				{
					baudRate: 57600,
					parser: serialport.parsers.readline("\n"),
					autoOpen: false
				});
		this.setupListeners();

		this.mConnection.open();
		
		return this.mConnection;
	}

	public write(command: string): boolean {
		if (this.mConnection) {
			try {
				debug('writing command: "' + command +'"');
				this.mConnection.write(command);
				return true;
			} catch(err) {
				return false;
			}
			
		}
	}

	public closeConnection(): void {
		try {
			debug_connection('closing connection');
			this.mConnection.close();
			this.mConnection = null;
		} catch(err) {}
		
	}

	private setupListeners(): void {
		debug('setting up listeners');
		if (this.mConnection) {
			this.mConnection.on('data', (data) => {
				try {
					data = data.split(" ");
					this.emit(data[0], JSON.parse(data[1]));
				} catch(err) {
					this.emit('missing');
				}
				
			});
			this.mConnection.on('error', (error) => this.emit('error', error));
			this.mConnection.on('open', () => { 
				debug_connection('open');
				this.emit('open', this.mConnection);
			});
			this.mConnection.on('close', () => { 
				this.closeConnection();
				this.emit('close');
				debug_connection('close');
			});
		}
	}

	private poll_ports(): void {
		try {
			serialport.list((err: string, ports: serialport.portConfig[]) => {
				if (err) { debugger; }

				if (ports.length !== this.mPorts.length) { this.emit('update_ports', ports); }
				this.mPorts = ports;
			});
		} catch(err) {}
	}
}

export default new Serialport();