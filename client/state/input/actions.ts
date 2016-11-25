import {
	Input
} from '../../lib/Input';

import {
	INPUT_UPDATE_INPUTS,
	INPUT_TOGGLE_MODAL 
} from '../action-types';

export function update_inputs(input_list: Array<Input>) {
	return {
		type: INPUT_UPDATE_INPUTS,
		input_list
	};
}

export function toggle_modal() {
	return {
		type: INPUT_TOGGLE_MODAL
	};
}