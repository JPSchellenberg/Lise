import * as fetch from 'isomorphic-fetch';

declare var window: any;


export function get_portlist() {
	return fetch( window.location.href + 'api/v0/serialport/list' , {
		method: 'get'
	});
}

export function get_connection() {
	return fetch( window.location.href + 'api/v0/serialport/connection' , {
		method: 'get'
	});
}

export function post_connection(connection: any) {
	return fetch( window.location.href + 'api/v0/serialport/connection' , {
		method: 'post',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(connection)
	});
}

export function post_write(command: string) {
	return fetch( window.location.href + 'api/v0/serialport/write' , {
		method: 'post',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ command })
	});
}

export function post_flash_sketch() {
	return fetch( window.location.href + 'api/v0/sketch/flash' , {
		method: 'post',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	});
}