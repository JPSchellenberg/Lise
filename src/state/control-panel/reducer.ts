// import { Map } from 'immutable';
import { assign } from 'lodash';

import { 
	CONTROLPANEL_START,
	CONTROLPANEL_STOP
} from '../action-types';

const initialState = {
	recording: false,
	recordingStartTime: new Date().getTime(),
	currentVoltage: 0
};

export default function(state = initialState, action) {
	switch(action.type) {

		case CONTROLPANEL_START:
			return assign({}, state, {
				recording: true,
				recordingStartTime: new Date().getTime()
			})

		case CONTROLPANEL_STOP:
			return assign({}, state, { recording: false });

		default:
			return state;
	}
	
}