import { assign } from 'lodash';

import {
	OS_SET_OS
} from '../action-types';

export default function(state = {
	os: {}
}, action) {
	switch (action.type) {

		case OS_SET_OS:
			return assign({}, state, { os: action.os });

		default:
			return state;
	}
}