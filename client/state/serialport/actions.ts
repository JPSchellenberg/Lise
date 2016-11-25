import {
	SERIALPORT_UPDATE_PORTLIST,
	SERIALPORT_CONNECT,
	SERIALPORT_UPDATE_CONNECTION_STATUS,
	SERIALPORT_UPDATE_CONNECTION
} from '../action-types';

import * as API 	from './api';

export function get_portlist() {
	return (dispatch) => {

			API.get_portlist()
			.then(res => { 
				return res.json()
			})
			.then((json) => {
				// dispatch( update_ports(json) );
			})
			.catch(err => { debugger; });  
		}
}

export function get_connection() {
	return (dispatch) => {

			API.get_connection()
			.then(res => res.json())
			.then((json) => {
				// dispatch( update_connection( json ) );
			})
			.catch(err => {
				// dispatch( update_connection( null ) );
			 });  
		}
		
}

export function post_connection(connection: any) {

	return (dispatch) => {

			API.post_connection(connection)
			.then(res => res.json())
			.then((json) => {
				// dispatch( update_connection(json) );
			})
			.catch(err => { 
				// dispatch( update_connection(null) );
			 });  
		}

}


export function update_ports(ports: any) {
	return dispatch => {
			dispatch({
				type: SERIALPORT_UPDATE_PORTLIST,
				ports
			});

	}
}

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

export function write(command: string) {
		return (dispatch) => {

			API.post_write(command)
			.then(res => {
				if (res.status !== 200) {
					throw new Error('status not 200');
				}
			})
			.catch(err => { 
				debugger;
			 });  
		}
}