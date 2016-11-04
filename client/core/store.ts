import { createStore } from 'redux';

import { throttle } from 'lodash';

import rootReducer              from './reducer';

// export function loadState() {
// 	try {
// 		const serializedState = localStorage.getItem('state');
// 		if (serializedState === null) {
// 			return undefined;
// 		}
// 		return JSON.parse(serializedState);
// 	} catch(err) { return undefined; }
// }

// export function saveState(state) {
// 	try {
// 		const serializedState = JSON.stringify(state);
// 		localStorage.setItem('state', serializedState);
// 	} catch (err) {
// 		debugger;
// 	}
// }

const persistentState = /*process.env.NODE_ENV !== 'development' ? loadState() :*/ undefined;

declare var window: any;

const store = createStore<any>(rootReducer, persistentState, window.devToolsExtension && window.devToolsExtension());

		// store.subscribe(throttle( () => {
		// 	saveState( store.getState() );
		// }, 1000) );

export default store;