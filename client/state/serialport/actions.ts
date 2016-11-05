import {
	PORTS_UPDATEPORTS,
	PORTS_SELECTPORT,
	PORTS_CONNECTIONSTATUS,
	PORTS_CONNECTIONINFO
} from '../action-types';

import Communication from '../../lib/Communication';
import * as API 	from './api';

export function GET_list() {
	return (dispatch) => {

			API.GET_list()
			.then(res => { 
				console.log(res);
				// dispatch( success() )
				return res.json()
			})
			.then((json) => {
				dispatch( updatePorts(json) );
				console.log(json);
			})
			.catch(err => { console.log(err) });  
		}
}

export function GET_connection() {
	return (dispatch) => {

			API.GET_connection()
			.then(res => { 
				console.log(res);
				// dispatch( success() )
				return res.json()
			})
			.then((json) => {
				dispatch( updateConnection(json) );
				console.log(json);
			})
			.catch(err => { console.log(err) });  
		}
}


export function updatePorts(ports: any) {
	return {
		type: PORTS_UPDATEPORTS,
		ports
	}
}

export function selectPort(comName: string) {
	
	Communication.emit('connect_port', comName);

	return {
		type: PORTS_SELECTPORT,
		comName
	}
}

export function connectionStatus(status: string) {
	return {
		type: PORTS_CONNECTIONSTATUS,
		status
	}
}

export function updateConnection(connection: any) {
	return {
		type: PORTS_CONNECTIONINFO,
		connection
	}
}