import { 
	createStore,
	applyMiddleware,
	compose
} from 'redux';
import thunk 		   			from 'redux-thunk';
const composeWithDevTools = require('redux-devtools-extension');

import rootReducer              from './reducer';

declare var window: any;
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore<any>(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;