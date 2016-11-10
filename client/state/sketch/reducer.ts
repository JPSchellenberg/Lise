import { assign } from 'lodash';

import {
	SKETCH_UPDATE_SAMPLERATE,
	SKETCH_UPDATE_GAIN,
	SKETCH_SETVERSION,
	SKETCH_SET_STATUS
} from '../action-types';

export default function(state = {
	samplerate: null,
	gain: null,
	version: "0.0.0",
	status: 'error'
}, action) {
	switch (action.type) {

		case SKETCH_UPDATE_SAMPLERATE:
			return assign({}, state, { samplerate: action.samplerate });

		case SKETCH_SETVERSION:
			return assign({}, state, { version: action.version });

		case SKETCH_UPDATE_GAIN:
			return assign({}, state, { gain: action.gain });

		case SKETCH_SET_STATUS:
			return assign({}, state, { status: action.status });
			
		default:
			return state;
	}
}