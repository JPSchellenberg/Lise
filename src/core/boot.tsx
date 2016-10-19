/// <reference path="../../typings/index.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider}           from 'react-redux';

import Layout from '../layout';

import Store from './store';

import page from './page';

import Bootscreen from '../components/Bootscreen';
import Core from './index';

import communication from '../lib/Communication';

import flash from '../lib/Flash';

import {
	updatePorts,
	connectionStatus,
	connectionInfo
} from '../state/ports/actions';

import { 
	showNotification,
	hideNotification
 } from '../state/notifications/actions';

 import { selectPort } from '../state/ports/actions';

import Notification from '../state/notifications/notification';

declare var window: any;

export default function boot() {

		const core = new Core( (modules) => {
			ReactDOM.render(
				<Bootscreen version={process.env.VERSION} modules={modules}/> ,
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
		core.boot( page );

		core.boot( communication );
		communication.on('portUpdate', (ports) => {
			Store.dispatch( updatePorts(ports) );

			const notification = new Notification('SerialPorts', 'success');
			Store.dispatch( showNotification( notification ) );
			setTimeout(() => { 
				Store.dispatch( hideNotification( notification.id ));
			}, 2000);
		} );

		communication.on('version', (version) => { Store.dispatch( connectionInfo(version) ) });
		communication.on('connection', (status) => { Store.dispatch( connectionStatus( status ) ) });


		// DUMMY MEASUREMENT
		window.channel1 = [];
		window.channel2 = [];
		window.recording = false;

		communication.on('data', (data) => {
			if (window.recording) {
				data = JSON.parse( data.split(" ")[1] ); 
				window.channel1.push([ data.time, data.channel1]);
				window.channel2.push([ data.time, data.channel2]);

				if (window.channel1.length > 300) { window.channel1.shift(); }
				if (window.channel2.length > 300) { window.channel2.shift(); }
			}
		});

		if (window.electron) {
				core.boot( flash );
				flash.on('flash', (status, port) => {
					const notification = new Notification('Arduino on port '+port+' flashed', 'success');
					Store.dispatch( showNotification( notification ) );
					setTimeout( () => { 
						communication.connect(port); 
						Store.dispatch( selectPort(port) );
					
				}, 2000);
				});

				flash.on('danger', () => {
					const notification = new Notification('Arduino flashed failed', 'danger');
					Store.dispatch( showNotification( notification ) );
				});
		}



		core.finish(() => {
			ReactDOM.render(
				<Provider store={Store}>
					<Layout />
				</Provider> ,
			document.getElementById('root')
			); 
		});



	console.log('booting succesful');
}

