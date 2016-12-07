import { assign } from 'lodash';

import {
	SENSORS_TOGGLE_MODAL,
	SENSORS_UPDATE_SENSOR_LIST
} from '../action-types';

export default function(state = {
	status: 'init',
	showModal: false,
	sensor_list: []
}, action) {
	switch (action.type) {
		case SENSORS_UPDATE_SENSOR_LIST:
			return assign({}, state, { sensor_list: action.sensor_list });

		case SENSORS_TOGGLE_MODAL:
			return assign({}, state, { showModal: !state.showModal });
			

		default:
			return state;
	}
}