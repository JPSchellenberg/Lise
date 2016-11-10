import * as os 		from 'os';
import server		from '../core/server';

import openWRT 		from './openWRT';
import {
	post_flash,
	get_flash
}		from './flash';

export default function() {

	// mips = arch used for arduino yun // seeeduino cloud
	if (os.type() === 'Linux' && os.arch() === 'mips') { 
		openWRT();
	} else {
		server.post('/api/v0/sketch/flash', post_flash);
		server.get('/api/v0/sketch/flash', get_flash);
	}

	
}