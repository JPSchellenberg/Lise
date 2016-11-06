/// <reference path="../../typings/index.d.ts" />
import * as express		from 'express';
import * as serialport 	from 'serialport';
import * as os 			from 'os';

import core 			from '../core';

export default function (server: express.Application) {
	server.get('/api/v0/serialport/list', (req: express.Request, res: express.Response, next: express.NextFunction) => {
		try {
			res.json( core.getPorts() );
		} catch (err) {
			res.json(err);
		}
	});

	server.get('/api/v0/serialport/connection', (req: express.Request, res: express.Response, next: express.NextFunction) => {
		try {
			if ( core.getConnection() ) {
				res.status(200).json( core.getConnection() );
			} else {
				res.status(404).end();
			}
			
		} catch(err) {
			res.status(503).end(err);
		}
	});

	server.post('/api/v0/serialport/connection', (req: express.Request, res: express.Response, next: express.NextFunction) => {
		try {
			core.setConnection(new serialport.SerialPort(
				req.body.comName, {
				baudRate: req.body.baudRate || 9600,
				parser: serialport.parsers.readline("\n")
			}));

			core.getConnection().on('error', (err) => res.status(503).end(err.toString()));
			core.getConnection().on('open', () => res.status(200).json( core.getConnection() ));

		} catch (err) {
			res.status(503).end(err);
		}
	});

	server.delete('/api/v0/serialport/connection', (req: express.Request, res: express.Response, next: express.NextFunction) => {
		try {
			core.closeConnection();
			res.status(200).end();
		} catch(err) {
			res.status(503).end(JSON.stringify(err));
		}
	});

	server.post('/api/v0/serialport/flash', (req: express.Request, res: express.Response, next: express.NextFunction) => {
		if (os.type() === 'Linux' && os.arch() === 'mips') { res.status(503).end('Flashing does not work on openWRT.')}
	});

}