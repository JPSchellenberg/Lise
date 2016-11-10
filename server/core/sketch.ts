/// <reference path="../../typings/index.d.ts" />


import * as EventEmitter 	from 'eventemitter3';
import { Serialport } 		from './serialport';
import serialport 			from './serialport';

class Sketch extends EventEmitter {
	constructor(serialport: Serialport) {
		super();

		this.mGain = 1;
		this.mSamplerate = 20;
		this.mSerialport = serialport;
		this.mVersion = {
			name: 'no sketch',
			version: "0.0.0"
		}
	}

	private mGain: number;
	private mSamplerate: number;
	private mSerialport: Serialport;
	private mVersion: {
		"name": string,
		"version": string
	};

	public get samplerate(): number { return this.mSamplerate; }
	public get gain(): number { return this.mGain; }
	public get version(): any { return this.mVersion; }

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

	public getVersion(cb?: (version: any) => void) {
		this.mSerialport.on('data', (data) => {
			data = data.split(" ");
			if (data[0] === 'version') {
				this.mVersion = JSON.parse(data[1]);
				if (cb) { cb(this.mVersion); }
			}
		});
		this.mSerialport.connection.write('v');
	}
}

export default new Sketch(serialport);