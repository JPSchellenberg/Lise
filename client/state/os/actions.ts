import {
	OS_GET_OS,
	OS_SET_OS
} from '../action-types';

import * as API 	from './api';

export function get_os() {
	return (dispatch) => {

			dispatch({ type: OS_GET_OS });

			API.get_os()
			.then(res => res.json())
			.then((json) => dispatch( set_os(json) ) )
			.catch(err => { debugger; });  
		}
}

export function set_os(os: any) {
	return {
		type: OS_SET_OS,
		os
	};
}

