/// <reference path="../../typings/index.d.ts" />

import serialport from '../core/serialport';
import * as libserialport from 'serialport';
import server 		from '../core/server';
import * as express from 'express';
const spawn = require('child_process').spawn;

import * as _debug from 'debug';

const debug = _debug('addon:openwrt');

export default function() {
	debug('start sequence');

	debug('adding /dev/ttyATH0 as port to serialport');
	serialport.addPort(<libserialport.portConfig>{
		"comName": '/dev/ttyATH0'
	});

	debug('connecting to /dev/ttyATH0');
	serialport.connect('/dev/ttyATH0');

	debug('setting up flash api')
	server.post('/api/v0/sketch/flash', post_flash);
}

export function post_flash(req: express.Request, res: express.Response, next: express.NextFunction) {
	debug('received flash api post call');
	try {
		debug('spawning avrdude-process');
		const avrdude = spawn('run-avrdude', ['/srv/lise/hex/sketch.hex']);
		avrdude.on('close', (code) => {
			debug('avrdude finished');
			setTimeout(() => { serialport.connect('/dev/ttyATH0'); }, 5000);
			res.status(200).end();
		});
	} catch(err) {
		debug('avrdude error', err);
		res.status(500).end();
	}
}