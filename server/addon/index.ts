import * as os 		from 'os';
import server		from '../core/server';

import openWRT 		from './openWRT';

export default function() {

	// mips = arch used for arduino yun // seeeduino cloud
	if (os.type() === 'Linux' && os.arch() === 'mips') { 
		openWRT();
	} else {
	}

	
}