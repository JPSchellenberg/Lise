import * as serialport		from 'serialport';
import * as EventEmitter 	from 'eventemitter3';

export class Serialport extends EventEmitter {
	constructor() {
		super();

		this.mConnection = null;
		this.mPorts = new Array();

		// start polling ports:
		setInterval(() => this.poll_ports(), 1000);

	}

	private mConnection: serialport.SerialPort;
	private mPorts: Array<serialport.portConfig>;

	public get connection(): serialport.SerialPort { return this.mConnection; }
	public get ports(): Array<serialport.portConfig> { return this.mPorts; }

	public addPort(port: serialport.portConfig): number { return this.mPorts.push(port); }

	public connect(comName: string): serialport.SerialPort {
		this.mConnection = new serialport.SerialPort(
				comName, {
				baudRate: 9600,
				parser: serialport.parsers.readline("\n")
			});
		this.setupListeners();
		return this.mConnection;
	}

	public closeConnection(): void {
		this.mConnection.close();
		this.mConnection = null;
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
			serialport.list((err: string, ports: serialport.portConfig[]) => {
				if (err) { debugger; }

				if (ports.length !== this.mPorts.length) { this.emit('update_ports', ports); }
				this.mPorts = ports;
			});
		} catch(err) {}

	}
}

export default new Serialport();