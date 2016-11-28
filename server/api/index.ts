import * as express from 'express';

import {
	get_list,
	get_connection,
	post_connection,
	delete_connection,
	post_write
} from './serialport';

import {
	get_os
} from './os';


export default function(server: express.Application) {

	console.log("BOOT: server -> http-api");

	server.get('/api/v0/serialport/list', get_list);
	server.get('/api/v0/serialport/connection', get_connection);
	server.post('/api/v0/serialport/connection', post_connection);
	server.delete('/api/v0/serialport/connection', delete_connection);
	server.post('/api/v0/serialport/write', post_write);

	server.get('/api/v0/os', get_os);
	
}