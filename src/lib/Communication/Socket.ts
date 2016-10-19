import * as EventEmitter from 'eventemitter3';

export default class Socket extends EventEmitter {
	constructor() {
		super();
	}

	connection: any;

	boot(cb) {
		try{
			
			this.connect();

			cb('success');
		} catch(err) {
			cb('danger');
		}
	};

	setupListeners() {
		this.connection.on('connect_error', () => { 
			this.emit('connection', 'danger');
		});

		this.connection.on('connect', () => {
			this.emit('connection', 'success');
		});

		this.connection.on('data', (data) => {
			this.emit('data', data);
		});
	}


	getName() { return 'Communication: Socket'; }

	connect() {
		this.connection = window['io'].connect( window.location.href );

		this.setupListeners();
	}
}