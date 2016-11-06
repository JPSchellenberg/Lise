import { assign } from 'lodash';

import {
	SKETCH_UPDATE_SAMPLERATE,
	SKETCH_UPDATE_GAIN
} from '../action-types';

export default function(state = {
	samplerate: null,
	gain: null
}, action) {
	switch (action.type) {

		case SKETCH_UPDATE_SAMPLERATE:
			return assign({}, state, { samplerate: action.samplerate });

		case SKETCH_UPDATE_GAIN:
			return assign({}, state, { gain: action.gain });
			
		default:
			return state;
	}
}