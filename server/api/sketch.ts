/// <reference path="../../typings/index.d.ts" />
import * as express from 'express';
import sketch from '../core/sketch';

export function get_samplerate(req: express.Request, res: express.Response, next: express.NextFunction) {
	try {
		res.status(200).end(JSON.stringify(sketch.samplerate));
	} catch (err) {
		res.json(err);
	}
}

export function post_samplerate(req: express.Request, res: express.Response, next: express.NextFunction) {
	try {
		if (sketch.samplerate = parseInt(req.params.samplerate)) {
			res.status(200).end();
		} else {
			res.status(404).end();
		}
	} catch (err) {
		res.status(503).end(err);
	}
}

export function get_gain(req: express.Request, res: express.Response, next: express.NextFunction) {
	try {
		res.status(200).end(JSON.stringify(sketch.gain));
	} catch (err) {
		res.json(err);
	}
}

export function post_gain(req: express.Request, res: express.Response, next: express.NextFunction) {
	try {
		sketch.gain = parseInt(req.params.gain);
		res.status(200).end();
	} catch (err) {
		res.status(503).end(JSON.stringify(err));
	}
}