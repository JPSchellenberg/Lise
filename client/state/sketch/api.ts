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

// export function createTask(task: Task) {
// 	return fetch('http://localhost:8080/api/v0/tasks', {
// 		method: 'post',
// 		headers: {
// 			'Accept': 'application/json',
// 			'Content-Type': 'application/json'
// 		},
// 		body: JSON.stringify(task)
// 	});
// }

// export function updateTask(taskId: string, key: string, value: any) {
// 	let update = {};
// 	update[key] = value;
// 	return fetch('http://localhost:8080/api/v0/tasks/'+taskId+'/'+key, {
// 		method: 'put',
// 		headers: {
// 			'Accept': 'application/json',
// 			'Content-Type': 'application/json'
// 		},
// 		body: JSON.stringify(update)
// 	});
// }