// @flow
import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import drawerIsOpen from './drawer'
import settings from './settings'
import home from './home'
import theme from './theme'
import weatherVisualizations from './weather-visualizations'

const rootReducer = combineReducers({
	drawerIsOpen,
	home,
	settings,
	theme,
	weatherVisualizations,
	router
})

export default rootReducer
