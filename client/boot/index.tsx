/// <reference path="../../typings/index.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider}           from 'react-redux';

import Layout from '../layout';
import Store from '../core/store';
import Bootscreen from '../components/Bootscreen';
import boot_socket from './socket';


 import {
	GET_list,
	GET_connection
} from '../state/serialport/actions';

import { 
  get_os 
} from '../state/os/actions'; 

import { 
  get_version
} from '../state/sketch/actions'; 

declare var window: any;


export default function boot() {

	boot_socket();

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


		Store.dispatch( GET_list() );
		Store.dispatch( GET_connection() );
		Store.dispatch( get_os() );
		Store.dispatch( get_version() );
}