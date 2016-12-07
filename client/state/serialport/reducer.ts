import { assign } from 'lodash';

import {
	SERIALPORT_CONNECT,
	SERIALPORT_UPDATE_PORTLIST,
	SERIALPORT_UPDATE_CONNECTION_STATUS,
	SERIALPORT_UPDATE_CONNECTION,
	SERIALPORT_UPDATE_SKETCH
} from '../action-types';

export default function(state = {
	portlist: [],
	connection: null,
	sketch: null
}, action) {
	switch (action.type) {

		case SERIALPORT_UPDATE_PORTLIST:
			return assign({}, state, { portlist: action.ports });
			
		case SERIALPORT_UPDATE_CONNECTION:
			return assign({}, state, { connection: action.connection });

		case SERIALPORT_UPDATE_SKETCH:
			return assign({}, state, { sketch: action.sketch });

		default:
			return state;
	}
}