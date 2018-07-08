// @flow
import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import drawerIsOpen from './drawer'
import settings from './settings'
import home from './home'
import theme from './theme'

const rootReducer = combineReducers({
	drawerIsOpen,
	home,
	settings,
	theme,
	router
})

export default rootReducer
