import * as express from 'express';
import serialport from '../core/serialport';

let 
	avrgirl,
	status;
try {
	avrgirl = require('avrgirl-arduino');
	status = 'success';
} catch(err) {
	avrgirl = err;
	status = 'error';
}
	


export function post_flash(req: express.Request, res: express.Response, next: express.NextFunction) {
	if (!req.body.board || !req.body.comName) { res.status(422).end(); return; }

	try {
		let flasher = new avrgirl({
			board: req.body.board,
			port: req.body.comName
		});
		flasher.flash(__dirname + '/../hex/adafruit_differential.hex', (err) => {
			if (err) {
				res.status(503).json(JSON.stringify(err));
			} else {
				res.status(200).end();
			}
		});
	} catch(err) { 
		res.status(503).json(JSON.stringify(err)); 
	}
}

export function get_flash(req: express.Request, res: express.Response, next: express.NextFunction) {
	if (status === 'success') {
		res.status(200).end('flash available');
	} else {
		res.status(503).json(JSON.stringify(avrgirl));
	}

}