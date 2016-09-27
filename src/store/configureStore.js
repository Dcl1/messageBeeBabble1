import { Platform } from 'react-native';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import devTools from 'remote-redux-devtools';
import * as reducers from '../reducers';
const reducer = combineReducers(reducers);

export default function configureStore(initialState) {
	const enhancer = compose(
		applyMiddleware(thunk),
		devTools({
			name: Platform.iOS,
			hostname: 'localhost',
			port: 8081

		}),
		window.devToolsExtension ? window.devToolsExtension() : f => f
	);

	return createStore(reducer, initialState, enhancer);
}