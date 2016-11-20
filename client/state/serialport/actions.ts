import {
	SERIALPORT_UPDATE_PORTLIST,
	SERIALPORT_CONNECT,
	SERIALPORT_UPDATE_CONNECTION_STATUS,
	SERIALPORT_UPDATE_CONNECTION
} from '../action-types';

import {
	set_sketch_status
} from '../sketch/actions';

import * as API 	from './api';

export function get_portlist() {
	return (dispatch) => {

			API.get_portlist()
			.then(res => { 
				return res.json()
			})
			.then((json) => {
				dispatch( updatePorts(json) );
			})
			.catch(err => { debugger; });  
		}
}

export function GET_connection() {
	return (dispatch) => {

			dispatch( update_connection_status('pending') );

			API.GET_connection()
			.then(res => { 
				return res.json()
			})
			.then((json) => {
				dispatch( update_connection(json) );
				dispatch( update_connection_status('success') );
			})
			.catch(err => {
				dispatch( update_connection( null ) );
				dispatch( update_connection_status('error') );
			 });  
		}
}

export function post_connection(connection: any) {
	return (dispatch) => {

			dispatch( update_connection_status('pending') );

			API.POST_connection(connection)
			.then(res => { 
				return res.json()
			})
			.then((json) => {
				dispatch( update_connection(json) );
				dispatch( update_connection_status('success') );
			})
			.catch(err => { 
				dispatch( update_connection(null) );
				dispatch( update_connection_status('error') );
			 });  
		}
}


export function updatePorts(ports: any) {
	return dispatch => {
			dispatch({
				type: SERIALPORT_UPDATE_PORTLIST,
				ports
			});

	}
}

// export function connect_port(comName: string) {
// 	return (dispatch) => {
// 		dispatch( POST_connection({"comName": comName}) );
// 		dispatch( setPort(comName) );
// 	}
// }

export function setPort(comName: string) {
		return {
		type: SERIALPORT_CONNECT,
		comName
	};
}

export function update_connection_status(status: string) {
	return {
		type: SERIALPORT_UPDATE_CONNECTION_STATUS,
		status
	}
}

export function update_connection(connection: any) {
	return {
		type: SERIALPORT_UPDATE_CONNECTION,
		connection
	}
}