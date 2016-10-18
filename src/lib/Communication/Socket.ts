import * as EventEmitter from 'eventemitter3';

export default class Socket extends EventEmitter {
	boot(cb) {
		try{
			cb('warning');
		} catch(err) {
			cb('danger');
		}
	};


	getName() { return 'Communication: Socket'; }

	connect(comName: string) {}
}