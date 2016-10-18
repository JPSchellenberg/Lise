import { assign } from 'lodash';
import { TimeSeriesState } from './state';

import { 
	TIMESERIES_SHOWSETTINGS,
	TIMESERIES_SAVE
} from './constants';

export default function(state: TimeSeriesState = new TimeSeriesState(), action): TimeSeriesState {
	switch(action.type) {
		case TIMESERIES_SHOWSETTINGS:
			return assign({}, state, { showSettings: !state.showSettings });

		case TIMESERIES_SAVE:
			return assign({}, state, action.state, { showSettings: false});

		default:
			return state;
	}
	
}