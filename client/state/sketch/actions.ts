import {
	SKETCH_UPDATE_SAMPLERATE,
	SKETCH_UPDATE_GAIN,
	SKETCH_SETVERSION,
	SKETCH_SET_STATUS
} from '../action-types';

import * as API 	from './api';

export function post_samplerate(samplerate: number) {
	return (dispatch) => {

			API.POST_samplerate(samplerate)
			.then(res => { 
				if (res.status === 200) { dispatch( update_samplerate( samplerate ) ); }
			})
			.catch(err => { debugger; });  
		}
}

export function post_gain(gain: number) {
	return (dispatch) => {

			API.POST_gain(gain)
			.then(res => { 
				if (res.status === 200) { dispatch( update_gain( gain ) ); }
			})
			.catch(err => { debugger; });  
		}
}

export function get_gain() {
	return (dispatch) => {

			API.GET_gain()
			.then(res => { 
				if (res.status === 200) {
					return res.json()
				}
			})
			.then(gain => {
				dispatch( update_gain( gain ) );
			})
			.catch(err => { debugger; });  
		}
}

export function get_version() {
	return (dispatch) => {

			dispatch( set_sketch_status( 'warning' ) );

			API.GET_version()
			.then(res => { 
				if (res.status === 200) {
					return res.json()
				}
			})
			.then(version => {
				dispatch( set_version(version) );
				if (version.version !== '0.0.0') {
					dispatch( set_sketch_status( 'success' ) );
				} else {
					dispatch( set_sketch_status( 'error' ) );
				}
				
			})
			.catch(err => { debugger; });  
		}
}

export function set_version(version: any) {
	return { 
		type: SKETCH_SETVERSION,
		version 
	};
}

export function get_samplerate() {
	return (dispatch) => {

			API.GET_samplerate()
			.then(res => { 
				if (res.status === 200) {
					return res.json()
				}
			})
			.then(samplerate => {
				samplerate = 1/(samplerate/1000);
				dispatch( update_samplerate( samplerate ) );
			})
			.catch(err => { debugger; });  
		}
}

export function update_samplerate(samplerate: number) {
	return {
		type: SKETCH_UPDATE_SAMPLERATE,
		samplerate
	};
}

export function update_gain(gain: number) {
	return {
		type: SKETCH_UPDATE_GAIN,
		gain
	};
}

export function set_sketch_status(status: string) {
	return {
		type: SKETCH_SET_STATUS,
		status
	}
}

export function post_flash(comName: string) {
	return (dispatch) => {

			API.POST_flash(comName)
			.then(res => { 
				if (res.status === 200) { 
					dispatch( get_version() ); 
				} else {
					// dispatch()
				}
			})
			.catch(err => {
				debugger;
			 });  
		}
}