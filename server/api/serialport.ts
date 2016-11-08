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
		if (os.arch() !== 'mips') {
			serialport.connect(req.body.comName);

			serialport.connection.on('error', (err) => res.status(503).end(err.toString()));
			serialport.connection.on('open', () => res.status(200).json(serialport.connection));
		} else {
			res.status(200).json(serialport.connection);
		}


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