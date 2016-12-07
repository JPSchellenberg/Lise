/// <reference path="../../typings/index.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider}           from 'react-redux';

import Layout from '../core/root';
import Store from '../core/store';
import Bootscreen from '../components/Bootscreen';
import boot_socket from './socket';

import Data from '../core/data';

import {
	get_os
} from '../state/os/actions';

declare var window: any;


export default function boot() {

	boot_socket();

	Data;
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

	Store.dispatch( get_os() );
}