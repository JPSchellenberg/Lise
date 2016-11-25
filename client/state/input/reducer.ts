import { assign } from 'lodash';

import {
	INPUT_UPDATE_INPUTS,
	INPUT_UPDATE_STATUS,
	INPUT_TOGGLE_MODAL,

	SKETCH_UPDATE_SKETCH
} from '../action-types';

export default function(state = {
	status: 'init',
	showModal: true,
	input_list: [{
		name: 'test'
	}],
	settings: {
		gain1: 'g1',
		gain2: 'h1',
		samplerate: '20'
	}
}, action) {
	switch (action.type) {
		case INPUT_UPDATE_INPUTS:
			return assign({}, state, { input_list: action.input_list });

		case INPUT_UPDATE_STATUS:
			return assign({}, state, { status: action.status });

		case INPUT_TOGGLE_MODAL:
			return assign({}, state, { showModal: !state.showModal });

		case SKETCH_UPDATE_SKETCH:
			if (action.sketch !== null) { return (assign({}, state, {status: 'success'})) }
			else { return state; }
			

		default:
			return state;
	}
}