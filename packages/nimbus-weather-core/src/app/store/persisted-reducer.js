import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { reducers } from '../root-reducer'
import stateReconciler from './state-reconciler'

const rootPersistConfig = {
	key: 'root',
	storage,
	stateReconciler,
	blacklist: ['home']
}

const homePersistConfig = {
	key: 'home',
	storage,
	stateReconciler,
	blacklist: ['geolocating', 'fetchingWeather']
}

export default persistReducer(
	rootPersistConfig,
	combineReducers({
		...reducers,
		home: persistReducer(homePersistConfig, reducers.home)
	})
)
