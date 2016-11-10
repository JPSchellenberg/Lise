/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as socketio 		from 'socket.io-client';
import {Provider}           from 'react-redux';

import Layout from '../../layout';

import Store from '../store';

import page from '../page';

import Bootscreen from '../../components/Bootscreen';
import Core from '../index';

import communication from '../../lib/Communication';

import {
	updatePorts,
	connectionStatus,
	GET_list,
	GET_connection
} from '../../state/serialport/actions';

import { 
	showNotification,
	hideNotification
 } from '../../state/notifications/actions';

 import { connectPort } from '../../state/serialport/actions';

import {
	get_os
} from '../../state/os/actions';

import {
	get_version,
	set_sketch_status,
	set_version
} from '../../state/sketch/actions';

import {
	updateConnection
} from '../../state/serialport/actions';

import Notification from '../../state/notifications/notification';

declare var window: any;

export default function boot() {

		const core = new Core( (modules) => {
			ReactDOM.render(
				<Provider store={Store}>
					<div>
						<Bootscreen version={process.env.VERSION} modules={modules}/>
						<Layout />
					</div>
				</Provider>
				 ,
				document.getElementById('root')
			); 
		});

		// dummy boots 
		core.boot({
			boot: (cb) => cb('success'),
			getName: () => 'Store'
		})

		core.boot({
			boot: (cb) => cb('success'),
			getName: () => 'Reducer'
		})


		// initiate boot sequence:
		// core.boot( page );

		// DUMMY MEASUREMENT
		window.channel1 = [];
		window.channel2 = [];
		window.storage1 = [];
		window.storage2 = [];
		window.recording = false;

		const socket_channel_serialport = socketio.connect( window.location.href + 'serialport' );

		socket_channel_serialport.on('data', (data) => {
			
			if (window.recording) {
				try {
					data = JSON.parse( data.split(" ")[1] ); 
					if (!window.lastTime) { window.lastTime = data.time; }
					window.channel1.push([ ((data.time-window.lastTime)/1000), data.channel1/1000]);
					window.channel2.push([ ((data.time-window.lastTime)/1000), data.channel2/1000]);
					window.storage1.push([ ((data.time-window.lastTime)/1000), data.channel1/1000]);
					window.storage2.push([ ((data.time-window.lastTime)/1000), data.channel2/1000]);
					if (window.channel1.length > 300) { window.channel1.shift(); }
					if (window.channel2.length > 300) { window.channel2.shift(); }
				} catch(err) {}

			}
		});

		socket_channel_serialport.on('update_ports', (ports) => {
			Store.dispatch( updatePorts(ports) );

			const notification = new Notification('SerialPorts', 'success');
			Store.dispatch( showNotification( notification ) );
			setTimeout(() => { 
				Store.dispatch( hideNotification( notification.id ));
			}, 2000);
		} );

		socket_channel_serialport.on('close', (connection) => {
			Store.dispatch( updateConnection(connection) );
			Store.dispatch(set_sketch_status('error'));
		});


		// communication.on('version', (version) => { Store.dispatch( connectionInfo(version) ) });
		socket_channel_serialport.on('connection', (status) => { Store.dispatch( connectionStatus( status ) ) });

		const socket_channel_sketch = socketio.connect( window.location.href + 'sketch' );

		socket_channel_sketch.on('version', (version) => {
			if (version.version !== '0.0.0') {
				Store.dispatch(set_sketch_status('success'));
			} else {
				Store.dispatch(set_sketch_status('error'));
			}
			
			Store.dispatch( set_version( version ) );
		});
		// core.finish(() => {
		// 	ReactDOM.render(
		// 		<Provider store={Store}>
		// 			<Layout />
		// 		</Provider> ,
		// 	document.getElementById('root')
		// 	); 
		// });


		Store.dispatch( GET_list() );
		Store.dispatch( GET_connection() );
		Store.dispatch( get_os() );
		Store.dispatch( get_version() );
	console.log('booting succesful');
}

