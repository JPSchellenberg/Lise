import * as EventEmitter 	from 'eventemitter3';
import { Serialport } 		from './serialport';
import serialport 			from './serialport';

class Sketch extends EventEmitter {
	constructor(serialport: Serialport) {
		super();

		this.mGain = 1;
		this.mSamplerate = 20;
		this.mSerialport = serialport;
	}

	private mGain: number;
	private mSamplerate: number;
	private mSerialport: Serialport;

	public get samplerate(): number { return this.mSamplerate; }
	public get gain(): number { return this.mGain; }

	public set samplerate(samplerate: number) { 
		this.mSerialport.connection.write('s'+samplerate);
		this.mSamplerate = samplerate; 
		this.emit('samplerate', samplerate); 
	}
	public set gain(gain: number) { 
		this.mSerialport.connection.write('g'+gain);
		this.mGain = gain; 
		this.emit('gain', gain); 
	}
}

export default new Sketch(serialport);