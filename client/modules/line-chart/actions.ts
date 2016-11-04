import {
	LINECHART_SHOWSETTINGS,
	LINECHART_SAVE
} from './constants';


export function showSettings() {
	return {
		type: LINECHART_SHOWSETTINGS
	};
}

export function save(state: any) {
	return {
		type: LINECHART_SAVE,
		state
	};
}