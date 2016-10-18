import {
	TIMESERIES_SHOWSETTINGS,
	TIMESERIES_SAVE
} from './constants';

import { TimeSeriesState } from './state';

export function showSettings() {
	return {
		type: TIMESERIES_SHOWSETTINGS
	};
}

export function save(state: TimeSeriesState) {
	return {
		type: TIMESERIES_SAVE,
		state
	};
}