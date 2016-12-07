import serialport from '../core/serialport';
import * as libserialport from 'serialport';

import * as _debug from 'debug';

const debug = _debug('addon:openwrt');

export default function() {
	debug('start sequence');

	debug('adding /dev/ttyATH0 as port to serialport');
	serialport.addPort(<libserialport.portConfig>{
		"comName": '/dev/ttyATH0'
	});

	debug('connecting to /dev/ttyATH0');
	serialport.connect('/dev/ttyATH0');
}
