import { assign } from 'lodash';

import {
	SKETCH_UPDATE_SAMPLERATE,
	SKETCH_UPDATE_GAIN,
	SKETCH_SETVERSION,
	SKETCH_UPDATE_SKETCH,
	SKETCH_UPDATE_STATUS,

	SERIALPORT_UPDATE_CONNECTION
	// SKETCH__STATUS
} from '../action-types';

export default function(state = {
	status: 'init',
	sketch: null
}, action) {
	switch (action.type) {

		case SKETCH_UPDATE_SAMPLERATE:
			return assign({}, state, { samplerate: action.samplerate });

		// case SKETCH_SETVERSION:
		// 	return assign({}, state, { version: action.version });

		case SKETCH_UPDATE_GAIN:
			return assign({}, state, { gain: action.gain });

		case SKETCH_UPDATE_SKETCH:
				if (action.sketch === null) { return assign({}, state, {sketch: null, status: 'error'}); }
				else { return assign({}, state, { sketch: action.sketch, status: 'success' }); }
			
		case SKETCH_UPDATE_STATUS:
			return assign({}, state, { status: action.status });

		case SERIALPORT_UPDATE_CONNECTION:
			if (action.connection === null) { return assign({}, state, {status: 'init'}) }
			else { return assign({}, state, { status: 'pending'}); }
			
			
		default:
			return state;
	}
}