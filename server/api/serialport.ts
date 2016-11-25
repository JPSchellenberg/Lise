/// <reference path="../../typings/index.d.ts" />
import * as express from 'express';
import * as os from 'os';

import serialport from '../core/serialport';

export function get_list(req: express.Request, res: express.Response, next: express.NextFunction) {
	try {
		res.json(serialport.ports);
	} catch (err) {
		res.json(err);
	}
}

export function get_connection(req: express.Request, res: express.Response, next: express.NextFunction) {
	try {
		if (serialport.connection) {
			res.status(200).json(serialport.connection);
		} else {
			res.status(404).end();
		}

	} catch (err) {
		res.status(503).end(err);
	}
}

export function post_connection(req: express.Request, res: express.Response, next: express.NextFunction) {
	try {
		if (serialport.connection) { serialport.closeConnection(); }
			serialport.connect(req.body.comName);
			res.status(200).end();
		} catch (err) {
		res.status(503).end(JSON.stringify(err));
	}
}

export function delete_connection(req: express.Request, res: express.Response, next: express.NextFunction) {
	try {
		serialport.closeConnection();
		res.status(200).end();
	} catch (err) {
		res.status(503).end(JSON.stringify(err));
	}
}

export function post_write(req: express.Request, res: express.Response, next: express.NextFunction) {
	try {
		serialport.write(req.body.command);
		res.status(200).end();
	} catch(err) {
		res.status(404).end();
	}
}