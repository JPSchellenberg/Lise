import * as socket from 'socket.io-client';
import Store from '../../core/store';

import { 
	showNotification,
	hideNotification
 } from '../../state/notifications/actions';

 import {
	updatePorts,
	update_connection_status,
	GET_connection
} from '../../state/serialport/actions';

import {
	update_connection
} from '../../state/serialport/actions';

import Notification from '../../state/notifications/notification';


import {
	set_sketch_status,
	post_flash
} from '../../state/sketch/actions';

declare var window: any;

const channel = {
	'serialport': socket.connect(window.location.href + 'serialport')
};

export default function() {
	channel['serialport'].on('data', (data) => {

		if (window.recording) {
			try {
				data = JSON.parse(data.split(" ")[1]);
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
			Store.dispatch( updatePorts(ports) );

			const notification = new Notification('SerialPorts', 'success');
			Store.dispatch( showNotification( notification ) );
			setTimeout(() => { 
				Store.dispatch( hideNotification( notification.id ));
			}, 2000);
		} );

	channel['serialport'].on('close', (connection) => {
			Store.dispatch( update_connection(connection) );
			Store.dispatch(set_sketch_status('error'));
		});

	channel['serialport'].on('open', (connection) => { 
		Store.dispatch( update_connection( connection ) ) 
	});
}