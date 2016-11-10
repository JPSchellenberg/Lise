import { assign } from 'lodash';

import {
	MODAL_SHOW,
	MODAL_HIDE,
	MODAL_SET_CONTENT
} from '../action-types';

export default function(state = {
	show: false,
	content: null
}, action) {
	switch (action.type) {

		case MODAL_SHOW:
			return assign({}, state, { show: true});

		case MODAL_HIDE: 
			return assign({}, state, { show: false});

		case MODAL_SET_CONTENT:
			return assign({}, state, { content: action.content });

		default:
			return state;
	}
}