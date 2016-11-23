import { assign } from 'lodash';

import {
	INPUT_UPDATE_INPUTS,
	INPUT_UPDATE_STATUS,
	INPUT_TOGGLE_MODAL
} from '../action-types';

export default function(state = {
	status: 'ok',
	showModal: true,
	input_list: [{
		name: 'test'
	}]
}, action) {
	switch (action.type) {
		case INPUT_UPDATE_INPUTS:
			return assign({}, state, { input_list: action.input_list });

		case INPUT_UPDATE_STATUS:
			return assign({}, state, { status: action.status });

		case INPUT_TOGGLE_MODAL:
			return assign({}, state, { showModal: !state.showModal });

		default:
			return state;
	}
}