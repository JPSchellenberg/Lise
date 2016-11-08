import * as os 		from 'os';

import openWRT 		from './openWRT';

export default function() {

	// mips = arch used for arduino yun // seeeduino cloud
	if (os.type() === 'Linux' && os.arch() === 'mips') { 
		openWRT();
	}
}