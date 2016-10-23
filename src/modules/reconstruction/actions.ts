import {
	RECONSTRUCTION_SHOWSETTINGS,
	RECONSTRUCTION_SAVE
} from './constants';


export function showSettings() {
	return {
		type: RECONSTRUCTION_SHOWSETTINGS
	};
}

export function save(state: any) {
	return {
		type: RECONSTRUCTION_SAVE,
		state
	};
}