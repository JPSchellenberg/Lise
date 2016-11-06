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

			dispatch( connectionStatus('warning') );

			API.GET_connection()
			.then(res => { 
				console.log(res);
				// dispatch( success() )
				return res.json()
			})
			.then((json) => {
				dispatch( updateConnection(json) );
				dispatch( connectionStatus('success') );
			})
			.catch(err => {
				dispatch( updateConnection({}) );
				dispatch( connectionStatus('danger') );
			 });  
		}
}

export function POST_connection(connection: any) {
	return (dispatch) => {

			dispatch( connectionStatus('warning') );

			API.POST_connection(connection)
			.then(res => { 
				return res.json()
			})
			.then((json) => {
				dispatch( updateConnection(json) );
				dispatch( connectionStatus('success') );
			})
			.catch(err => { 
				dispatch( updateConnection({}) );
				dispatch( connectionStatus('danger') );
			 });  
		}
}


export function updatePorts(ports: any) {
	return {
		type: PORTS_UPDATEPORTS,
		ports
	}
}

export function selectPort(comName: string) {
	return (dispatch) => {
		dispatch( POST_connection({"comName": comName}) );
		dispatch( {
			type: PORTS_SELECTPORT,
			comName
			} );
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