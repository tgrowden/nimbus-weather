import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createHashHistory } from 'history'
import { routerMiddleware } from 'react-router-redux'
import { persistStore } from 'redux-persist'
import locationChangeMiddleware from './middleware/location-change'
import persistedReducer from './persisted-reducer'

const history = createHashHistory()
const router = routerMiddleware(history)
const enhancer = applyMiddleware(thunk, router, locationChangeMiddleware)

function configureStore(initialState?) {
	return createStore(persistedReducer, initialState, enhancer)
}

const store = configureStore()
const persistor = persistStore(store)

export default { store, history, persistor }
