import * as EventEmitter from 'eventemitter3';

declare var window: any;

class Flash extends EventEmitter {
	constructor() {
		super();
	}

	boot(cb) {
		try {
			window.bootFlash();
			cb('success');
		} catch(err) {
			debugger;
			cb('danger');
		}
		
	}

	getName() { return 'Flash'; }

	flash(port) {
		window.flash(port, (status) => {
			this.emit('flash', status, port);
		});
	}
}

export default new Flash();