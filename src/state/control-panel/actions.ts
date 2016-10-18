import {
	CONTROLPANEL_START,
	CONTROLPANEL_STOP
} from '../action-types';

export function startRecording() {
	return {
		type: CONTROLPANEL_START
	};
}

export function stop() {
	return {
		type: CONTROLPANEL_STOP
	};
}

