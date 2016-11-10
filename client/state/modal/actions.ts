import {
	MODAL_SHOW,
	MODAL_HIDE,
	MODAL_SET_CONTENT
} from '../action-types';

export function show_modal() {
	return {
		type: MODAL_SHOW
	}
}

export function hide_modal() {
	return {
		type: MODAL_HIDE
	};
}

export function set_content(content) {
	return {
		type: MODAL_SET_CONTENT,
		content
	};
}