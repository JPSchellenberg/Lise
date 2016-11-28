import {
	SENSORS_TOGGLE_MODAL,
	SENSORS_UPDATE_SENSOR_LIST
} from '../action-types';

export function update_sensor_list(sensor_list: Array<string>) {
	return {
		type: SENSORS_UPDATE_SENSOR_LIST,
		sensor_list
	};
}

export function toggle_modal() {
	return {
		type: SENSORS_TOGGLE_MODAL
	};
}