import * as express from 'express';

import setupSerialport		from './serialport';
import setupSketch			from './sketch';


export default function(server: express.Application) {
	setupSerialport(server);
	setupSketch(server);
}