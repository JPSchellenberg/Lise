import serialport from '../core/serialport';
import * as libserialport from 'serialport';

export default function() {
	serialport.addPort(<libserialport.portConfig>{
		"comName": '/dev/ttyATH0'
	});
	serialport.connect('/dev/ttyATH0');
}
