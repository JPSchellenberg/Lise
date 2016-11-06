import * as fetch from 'isomorphic-fetch';

declare var window: any;

export function GET_list() {
	return fetch( window.location.href + 'api/v0/serialport/list' , {
		method: 'get'
	});
}

export function GET_connection() {
	return fetch( window.location.href + 'api/v0/serialport/connection' , {
		method: 'get'
	});
}

export function POST_connection(connection: any) {
	return fetch( window.location.href + 'api/v0/serialport/connection' , {
		method: 'post',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(connection)
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