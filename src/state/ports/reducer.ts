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
	connectionInfo: {},
	portList: []
}, action) {
	switch (action.type) {

		case PORTS_UPDATEPORTS:
			return assign({}, state, { portList: action.ports });

		case PORTS_SELECTPORT:
			return assign({}, state, { selectedPort: action.comName });

		case PORTS_CONNECTIONSTATUS:
			return assign({}, state, { connectionStatus: action.status });

		case PORTS_CONNECTIONINFO:
			return assign({}, state, { connectionInfo: action.info });

		default:
			return state;
	}
}