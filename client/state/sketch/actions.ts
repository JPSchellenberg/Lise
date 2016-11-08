import {
	SKETCH_UPDATE_SAMPLERATE,
	SKETCH_UPDATE_GAIN
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