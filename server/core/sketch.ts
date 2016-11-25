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

		this.mSerialport.on('close', () => {
			this.version = null;
		});

		this.mSerialport.on('update', (update) =>{
			switch(update.name) {
				case 'samplerate': 
					this.mSamplerate = update.value;
					break;
				case 'channel1': 
					this.mGain1 = 'g'+update.value;
					break;
				case 'channel2':
					this.mGain2 = 'h'+update.value;
					break;
			}
		});
	}

	private mGain1: string;
	private mGain2: string;
	private mSamplerate: number;
	private mSerialport: Serialport;
	private mVersion: SketchVersion;
	private mTimeoutTimer: NodeJS.Timer;

	public get samplerate(): number { return this.mSamplerate; }
	public get gain1(): string { return this.mGain1; }
	public get gain2(): string { return this.mGain2; }
	public get version(): SketchVersion { return this.mVersion; }
	public set version(version: SketchVersion) { 
		this.mVersion = version;
		this.emit('version', version);
	}

	public getVersion() {
		if (this.mSerialport.connection) {
			this.mSerialport.connection.write('v');
			this.mTimeoutTimer = setTimeout(() => {
				this.version = null;                                             
			}, 2000);
		}
		
	}
}

export default new Sketch(serialport);