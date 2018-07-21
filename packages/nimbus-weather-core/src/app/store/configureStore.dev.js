import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { createHashHistory } from 'history'
import { routerMiddleware, routerActions } from 'react-router-redux'
import { createLogger } from 'redux-logger'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducer from '../root-reducer'
import locationChangeMiddleware from './middleware/location-change'
import stateReconciler from './state-reconciler'
import * as DrawerActions from '../drawer/actions'

const persistConfig = {
	key: 'root',
	storage,
	stateReconciler
}

const history = createHashHistory()

const configureStore = (initialState?) => {
	// Redux Configuration
	const middleware = []
	const enhancers = []

	// Thunk Middleware
	middleware.push(thunk)

	// Logging Middleware
	const logger = createLogger({
		level: 'info',
		collapsed: true
	})

	// Skip redux logs in console during the tests
	if (process.env.NODE_ENV !== 'test') {
		middleware.push(logger)
	}

	// Router Middleware
	const router = routerMiddleware(history)
	middleware.push(router)

	middleware.push(locationChangeMiddleware)

	// Redux DevTools Configuration
	const actionCreators = {
		...routerActions,
		...DrawerActions
	}
	// If Redux DevTools Extension is installed use it, otherwise use Redux compose
	/* eslint-disable no-underscore-dangle */
	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
			// Options: http://zalmoxisus.github.io/redux-devtools-extension/API/Arguments.html
			actionCreators
		  })
		: compose
	/* eslint-enable no-underscore-dangle */

	// Apply Middleware & Compose Enhancers
	enhancers.push(applyMiddleware(...middleware))
	const enhancer = composeEnhancers(...enhancers)

	const persistedReducer = persistReducer(persistConfig, rootReducer)

	// Create Store
	const store = createStore(persistedReducer, initialState, enhancer)

	if (module.hot) {
		module.hot.accept(
			'../root-reducer',
			() => store.replaceReducer(require('../root-reducer')) // eslint-disable-line global-require
		)
	}

	return store
}

const store = configureStore()

const persistor = persistStore(store)

export default { store, history, persistor }
