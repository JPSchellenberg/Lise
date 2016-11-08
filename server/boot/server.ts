import * as express from 'express';
import * as bodyParser		from 'body-parser';

export default function (server: express.Application) {

	console.log("BOOT: server -> body-parser");

	server.use(bodyParser.json());

	server.use(bodyParser.urlencoded({
		extended: true
	}));
	
	
	console.log("BOOT: server -> static-fileserver");

	server.get('*', express.static(__dirname+'/../../client'));

}