import * as _debug 		from 'debug';

import server 			from '../core/server';
import serialport		from '../core/serialport';

import boot_server 		from './server';
import boot_api 		from '../api';
import boot_socket 		from './socket';
import boot_addon 		from '../addon';

const debug = _debug('boot');
const express_debug = _debug('boot:express');

export default function() {
	debug('starting boot-sequence');

	boot_server(server);
	boot_api(server);

	
	const http_server = server.listen( process.env.PORT || 3000, function () {
		express_debug('express-server successfully booted: '+  (process.env.PORT || 3000));
	});

	boot_socket(http_server);

	boot_addon();
	
	debug('finished boot-sequence');
}
