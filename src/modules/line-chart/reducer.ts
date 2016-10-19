import { assign } from 'lodash';
import LineChartState from './state';

import { 
	LINECHART_SHOWSETTINGS,
	LINECHART_SAVE
} from './constants';

export default function(state: LineChartState = new LineChartState(), action): LineChartState {
	switch(action.type) {
		case LINECHART_SHOWSETTINGS:
			return assign({}, state, { showSettings: !state.showSettings });

		case LINECHART_SAVE:
			return assign({}, state, action.state, { showSettings: false});

		default:
			return state;
	}
	
}