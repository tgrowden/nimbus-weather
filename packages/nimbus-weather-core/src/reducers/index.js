// @flow
import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import drawer from './drawer'
import settings from './settings'
import home from './home'
import theme from './theme'
import weatherVisualizations from './weather-visualizations'

const rootReducer = combineReducers({
	drawer,
	home,
	settings,
	theme,
	weatherVisualizations,
	router
})

export default rootReducer
