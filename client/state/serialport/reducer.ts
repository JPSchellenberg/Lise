import { assign } from 'lodash';

import {
	PORTS_UPDATEPORTS,
	PORTS_SELECTPORT,
	PORTS_CONNECTIONSTATUS,
	PORTS_CONNECTIONINFO
} from '../action-types';

export default function(state = {
	selectedPort: 'No Port selected',
	connectionStatus: 'default',
	connectionInfo: null,
	connection: null,
	list: []
}, action) {
	switch (action.type) {

		case PORTS_UPDATEPORTS:
			return assign({}, state, { list: action.ports });

		case PORTS_SELECTPORT:
			return assign({}, state, { selectedPort: action.comName });

		case PORTS_CONNECTIONSTATUS:
			return assign({}, state, { connectionStatus: action.status });

		case PORTS_CONNECTIONINFO:
			return assign({}, state, { connection: action.connection });

		default:
			return state;
	}
}