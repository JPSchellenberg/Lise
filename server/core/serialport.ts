import * as os from 'os';
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
		this.mSketch = null;
		this.mSensors = [];

		this.on('open', () => {
			this.write("version"); // get version
			this.write("sensor"); // get sensors
			this.write("lisestart"); // start_lise
			this.mTimeoutTimer = setTimeout(() => {
				debug('receiving sketch timed out');
				if (os.arch() !== 'mips') { // do not close connection on openwrt
					this.sketch = null;
					this.sensors = []; 
					this.closeConnection();  
				}
				                                       
			}, 5000);
		});

		this.on('sketch', (sketch) => {
			debug_event('sketch',sketch);
			this.sketch = sketch;
			clearTimeout(this.mTimeoutTimer);
		});

		this.on('sensor', (sensors) => {
			debug_event('sensor', sensors);
			this.sensors = sensors;
		})

		// start polling ports:
		if (os.arch() !== 'mips' ) { // do not poll on openwrt
			setInterval(() => this.poll_ports(), 1000);
		}

		debug('constructor end');
	}

	private mConnection: serialport.SerialPort;
	private mPorts: Array<serialport.portConfig>;
	private mSketch: any;
	private mSensors: Array<string>; 
	private mTimeoutTimer: NodeJS.Timer;

	public get connection(): serialport.SerialPort { return this.mConnection; }
	public get ports(): Array<serialport.portConfig> { return this.mPorts; }

	public set sketch(sketch: any) { this.mSketch = sketch; }
	public get sketch(): any { return this.mSketch; }

	public set sensors(sensors: Array<string>) { this.mSensors = sensors; }
	public get sensors(): Array<string> { return this.mSensors; }

	public addPort(port: serialport.portConfig): number { 
		debug('adding port',port);
		return this.mPorts.push(port); 
	}

	public connect(comName: string): serialport.SerialPort {
		debug_connection('connecting to '+comName);

		const self = this;
		if (this.mConnection !== null) { 
			debug_connection('found existing connection -> closing connection');
			this.mConnection.on('close', () => connect(comName));
			this.closeConnection(); 
		} else {
			return connect(comName);
		}

		function connect(comName: string) {
			debug_connection('opening connection');
			self.mConnection = new serialport.SerialPort(
				comName, 
				{
					baudRate: 115200,
					parser: serialport.parsers.readline("\n"),
					autoOpen: false
				});
			
			self.setupListeners();

			self.mConnection.open();

			return self.mConnection;
		}
		
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
		} catch(err) {}
		
	}

	private setupListeners(): void {
		debug('setting up listeners');
		if (this.mConnection) {
			this.mConnection.on('data', (data) => {
				debug_connection('receiving data', data);
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
				debug_connection('close');
				this.mConnection = null; this.emit('close'); 
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