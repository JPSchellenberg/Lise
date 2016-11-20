import {
	SKETCH_UPDATE_SAMPLERATE,
	SKETCH_UPDATE_GAIN,
	SKETCH_SETVERSION,
	SKETCH_SET_STATUS,
	SKETCH_UPDATE_SKETCH,
	SKETCH_UPDATE_STATUS
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

export function get_sketch() {
	return (dispatch) => {

			dispatch( update_sketch_status( 'pending' ) );

			API.get_sketch()
			.then(res => { 
				if (res.status === 200) {
					return res.json()
				} else {
					dispatch( update_sketch_status( 'error' ) );
					return;
				}
			})
			.then(sketch => {
				if (sketch) {
					dispatch( update_sketch( sketch ) );
				}
				
			})
			.catch(err => { debugger; });  
		}
}

export function update_sketch(sketch: any) {
	return { 
		type: SKETCH_UPDATE_SKETCH,
		sketch
	};
}

export function update_sketch_status(status: string) {
	return {
		type: SKETCH_UPDATE_STATUS,
		status
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

export function post_flash(comName: string, board: string) {
	return (dispatch) => {

			API.POST_flash(comName, board)
			.then(res => { 
				if (res.status === 200) { 
					return res.json();
					// dispatch( get_version() ); 
				} else {
					throw Error('Did not work');
				}
			})
			.then(info => {
				dispatch( update_sketch(info.sketch) );
				dispatch( update_sketch_status( 'success') );
			})
			.catch(err => {
				dispatch( update_sketch_status( 'error') );
			 });  
		}
}