import { assign } from 'lodash';

import sensors from '../../core/sensors';

const _sensors = sensors["1.0.0-prerelease.6"];

import {
	SENSORS_UPDATE_SENSOR_LIST
} from '../action-types';

export default function(state = {}, action) {
	switch (action.type) {
		case SENSORS_UPDATE_SENSOR_LIST:
			let inputs = {};
			for (let j in action.sensor_list) {
				const sensor_name = action.sensor_list[j];
				inputs[sensor_name] = [];
				for (let i in _sensors[sensor_name].channel) {
					const channel_name = _sensors[sensor_name].channel[i].name;
					inputs[sensor_name].push( channel_name );
				}
				
			}
			return inputs;
			

		default:
			return state;
	}
}