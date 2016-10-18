import * as EventEmitter from 'eventemitter3';

declare var window: any;

export default class Serial extends EventEmitter {
	constructor() {
		super();
		this.portList = [];
	}

	serialport: any;
	portList: any;
	connection: any;

	boot(cb) {
		try{
			window.bootSerialport();
			this.serialport = window.serialport;
			this.pollSerialports();

			window.test = this;

			cb('success');
		} catch(err) {
			cb('danger');
		}
	};


	getName() { return 'Communication: Serial'; }

	pollSerialports() {
		setInterval(() => { 
        	this.serialport.list((err, ports) => { 
          	if (err) { throw new Error(err); } 

			
			if (ports.length !== this.portList.length) {
				this.portList = ports;
				this.emit('portUpdate', ports);
			}
			})
		}, 1000);
	}

	connect(comName: string) {
		const self = this;
		try {
			this.emit('connection', 'warning');

			this.connection = new self.serialport.SerialPort(comName, { 
        		baudRate: 9600, 
        		parser: self.serialport.parsers.readline("\n") 
      		}); 

			this.setupListener();
		
		} catch(err) { this.emit('error', err); }
	}

	setupListener() {

		this.connection.on('data', (data) => {
			if (data.indexOf('version') !== -1) {
				this.emit('version', JSON.parse( data.split(" ")[1] ) );
				this.emit('connection', 'success');
			} else {
				this.emit('data', data);
			}
			
		});

		this.connection.on('open', () => {
			this.requestVersion();

			const connectionTimeout = setTimeout(() => { this.emit('connection', 'danger')}, 5000);

			this.on('connection', (status) => { if (status === 'success') { clearTimeout(connectionTimeout); }});
		});

		this.connection.on('close', () => {
			this.emit('connection', 'danger');
		})

	}

	requestVersion() {
		this.connection.write('v'); 
	}
};