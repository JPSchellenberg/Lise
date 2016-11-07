/// <reference path="../../typings/index.d.ts" />
import * as express			from 'express';
import * as bodyParser		from 'body-parser';

import api 					from '../api';

export default function (server: express.Application) {

	console.log("CORE: BOOT: body-parser")
	server.use(bodyParser.json());

	server.use(bodyParser.urlencoded({
		extended: true
	}))

	console.log("CORE: BOOT: API-Routing");
	api(server);
	
	console.log("CORE: BOOT: static-fileserver");
	console.log( __dirname+'/client')
	server.get('*', express.static(__dirname+'/../../client'));
}