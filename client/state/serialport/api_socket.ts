import * as socket from 'socket.io-client';
import Store from '../../core/store';

import {
	update_ports,
	update_connection
} from './actions';

declare var window: any;

const channel = {
	'serialport': socket.connect(window.location.href + 'serialport')
};

export default function() {
	channel['serialport'].on('data', (data) => {

		if (window.recording) {
			try {
				if (!window.lastTime) {
					window.lastTime = data.time;
				}
				window.channel1.push([((data.time - window.lastTime) / 1000), data.channel1 / 1000]);
				window.channel2.push([((data.time - window.lastTime) / 1000), data.channel2 / 1000]);
				window.storage1.push([((data.time - window.lastTime) / 1000), data.channel1 / 1000]);
				window.storage2.push([((data.time - window.lastTime) / 1000), data.channel2 / 1000]);
				if (window.channel1.length > 300) {
					window.channel1.shift();
				}
				if (window.channel2.length > 300) {
					window.channel2.shift();
				}
			} catch (err) {}
		}
	});

	channel['serialport'].on('update_ports', (ports) => {
			Store.dispatch( update_ports(ports) );
		} );

	channel['serialport'].on('close', (connection) => {
			Store.dispatch( update_connection( null ) );
		});

	channel['serialport'].on('open', (connection) => { 
		Store.dispatch( update_connection( connection ) ) 
	});

	channel['serialport'].on('update_connection', (connection) => {
		Store.dispatch( update_connection( connection ) );
	})
}