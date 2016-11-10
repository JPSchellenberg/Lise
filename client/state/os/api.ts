import * as fetch from 'isomorphic-fetch';

declare var window: any;

export function get_os() {
	return fetch( window.location.href + 'api/v0/os' , {
		method: 'get'
	});
}