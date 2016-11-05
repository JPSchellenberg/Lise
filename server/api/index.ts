import * as express from 'express';

import setupSerialport		from './serialport';


export default function(server: express.Application) {
	setupSerialport(server);
}