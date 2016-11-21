/// <reference path="../../typings/index.d.ts" />


import * as EventEmitter 	from 'eventemitter3';
import { Serialport } 		from './serialport';
import serialport 			from './serialport';

interface SketchVersion {
	name: string;
	version: string;
}

class Sketch extends EventEmitter {
	constructor(serialport: Serialport) {
		super();

		this.mGain = 1;
		this.mSamplerate = 20;
		this.mSerialport = serialport;
		this.mVersion = null;

		this.mSerialport.on('open', () => { 
			this.getVersion(); 
		});

		this.mSerialport.on('version', (version) => {
			this.version = version;
			clearTimeout(this.mTimeoutTimer);
		});
	}

	private mGain: number;
	private mSamplerate: number;
	private mSerialport: Serialport;
	private mVersion: SketchVersion;
	private mTimeoutTimer: NodeJS.Timer;

	public get samplerate(): number { return this.mSamplerate; }
	public get gain(): number { return this.mGain; }
	public get version(): SketchVersion { return this.mVersion; }
	public set version(version: SketchVersion) { 
		this.mVersion = version;
		this.emit('version', version);
	}

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

	public getVersion() {
		this.mSerialport.connection.write('v');
		this.mTimeoutTimer = setTimeout(() => {
			this.version = { "name": "no sketch", "version": "0.0.0" };	                                             
		}, 2000);
	}
}

export default new Sketch(serialport);