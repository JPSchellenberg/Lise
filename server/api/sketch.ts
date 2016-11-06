/// <reference path="../../typings/index.d.ts" />
import * as express		from 'express';
import * as serialport 	from 'serialport';

import core 			from '../core';

export default function (server: express.Application) {
	server.get('/api/v0/sketch/samplerate', (req: express.Request, res: express.Response, next: express.NextFunction) => {
		try {
			res.status(200).end( JSON.stringify(core.getSampleRate()) );
		} catch (err) {
			res.json(err);
		}
	});

	server.post('/api/v0/sketch/samplerate/:sampleRate', (req: express.Request, res: express.Response, next: express.NextFunction) => {
		try {
			if (core.setSampleRate( parseInt(req.params.sampleRate) )) {
				res.status(200).end();
			} else {
				res.status(404).end();
			}
		} catch (err) {
			res.status(503).end(err);
		}
	});

	server.get('/api/v0/sketch/gain', (req: express.Request, res: express.Response, next: express.NextFunction) => {
		try {
			res.status(200).end( JSON.stringify(core.getGain()) );
		} catch (err) {
			res.json(err);
		}
	});

	server.post('/api/v0/sketch/gain/:gain', (req: express.Request, res: express.Response, next: express.NextFunction) => {
		try {
			if (core.setGain( parseInt(req.params.gain) )) {
				res.status(200).end();
			} else {
				res.status(404).end();
			}
		} catch (err) {
			res.status(503).end(err);
		}
	});
}