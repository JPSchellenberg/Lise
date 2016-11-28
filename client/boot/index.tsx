/// <reference path="../../typings/index.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider}           from 'react-redux';

import Layout from '../core/root';
import Store from '../core/store';
import Bootscreen from '../components/Bootscreen';
import boot_socket from './socket';

declare var window: any;


export default function boot() {

	boot_socket();

	window.store = Store;

	window.channel1 = []; 
    window.channel2 = []; 
    window.storage1 = []; 
    window.storage2 = []; 
    window.recording = false; 

			ReactDOM.render(
				<Provider store={Store}>
					<div>
						<Bootscreen version={process.env.VERSION} />
						<Layout />
					</div>
				</Provider>
				 ,
				document.getElementById('root')
			); 
}