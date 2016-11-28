import * as express from 'express';
import * as bodyParser		from 'body-parser';
import * as _debug 		from 'debug';

const debug = _debug('boot:express');

export default function (server: express.Application) {
	debug('booting express-server');

	debug('booting bodyParser');

	server.use(bodyParser.json());

	server.use(bodyParser.urlencoded({
		extended: true
	}));
	
	
	debug('booting static-fileserver');

	server.get('*', express.static(__dirname+'/../../client'));

}