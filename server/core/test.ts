import * as EventEmitter from 'eventemitter3';

class Test extends EventEmitter {
	constructor() {
		super();

		this.mTest = 'init';
	}

	private mTest: string;

	set test(test: string) { 
		this.mTest = test; 
		this.emit('test', test);
	}

	get test(): string { return this.mTest; }
}

export default new Test();