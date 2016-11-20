import { assign } from 'lodash';

import {
	SERIALPORT_CONNECT,
	SERIALPORT_UPDATE_PORTLIST,
	SERIALPORT_UPDATE_CONNECTION_STATUS,
	SERIALPORT_UPDATE_CONNECTION
} from '../action-types';

export default function(state = {
	connection: { status: 'error' },
	portlist: []
}, action) {
	switch (action.type) {

		case SERIALPORT_UPDATE_PORTLIST:
			return assign({}, state, { portlist: action.ports });

		// case SERIALPORT_CONNECT
		// 	return assign({}, state, { selectedPort: action.comName });

		case SERIALPORT_UPDATE_CONNECTION_STATUS:
			if (action.status === 'error') {
				return assign({}, state, { connection: null });
			} else  {
				return assign({}, state, { connection: assign({}, state.connection, { status: action.status }) });
			}
			
		case SERIALPORT_UPDATE_CONNECTION:
			return assign({}, state, { connection: action.connection });

		default:
			return state;
	}
}