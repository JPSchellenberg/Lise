import { assign } from 'lodash';

import {
	PAGE_SETPATH
} from '../action-types';

export default function(state = {
	path: ''
}, action) {
	switch (action.type) {

		case PAGE_SETPATH:
			return assign({}, state, { path: action.path });

		default:
			return state;
	}
}