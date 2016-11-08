import * as express from 'express';

import {
	get_list,
	get_connection,
	post_connection,
	delete_connection
} from './serialport';

import {
	get_samplerate,
	post_samplerate,
	get_gain,
	post_gain
} from './sketch';

import {
	get_test,
	post_test
} from './test';


export default function(server: express.Application) {

	console.log("BOOT: server -> http-api");

	server.get('/api/v0/serialport/list', get_list);
	server.get('/api/v0/serialport/connection', get_connection);
	server.post('/api/v0/serialport/connection', post_connection);
	server.delete('/api/v0/serialport/connection', delete_connection);

	server.get('/api/v0/sketch/samplerate', get_samplerate);
	server.post('/api/v0/sketch/samplerate/:samplerate', post_samplerate);
	server.get('/api/v0/sketch/gain', get_gain);
	server.post('/api/v0/sketch/gain', post_gain);

	server.get('/api/v0/test', get_test);
	server.post('/api/v0/test', post_test);
}