import { assign } from 'lodash';

import {
	OS_SET_OS
} from '../action-types';

export default function(state = {}, action) {
	switch (action.type) {

		case OS_SET_OS:
			return assign({}, state, action.os);

		default:
			return state;
	}
}