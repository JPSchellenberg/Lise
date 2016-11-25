import * as fetch from 'isomorphic-fetch';

declare var window: any;


export function GET_gain() {
	return fetch( window.location.href + 'api/v0/sketch/gain' , {
		method: 'get'
	});
}

export function GET_samplerate() {
	return fetch( window.location.href + 'api/v0/sketch/samplerate' , {
		method: 'get'
	});
}

export function get_sketch() {
	return fetch( window.location.href + 'api/v0/sketch' , {
		method: 'get'
	});
}

export function POST_samplerate(samplerate: number) {
	return fetch( window.location.href + 'api/v0/sketch/samplerate/'+samplerate , {
		method: 'post',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ samplerate })
	});
}

export function POST_gain(gain: number) {
	return fetch( window.location.href + 'api/v0/sketch/gain/'+gain , {
		method: 'post',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ gain })
	});
}

export function POST_flash(comName: string, board: string) {
	return fetch( window.location.href + 'api/v0/sketch/flash' , {
		method: 'post',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ 
			comName,
			board
		})
	});
}