// @flow
import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import drawer, { defaultState as drawerDefaultState } from './drawer/reducers'
import settings, { defaultState as settingsDefaultState } from './settings/reducers'
import home, { defaultState as homeDefaultState } from './home/reducers'
import theme, { defaultState as themeDefaultState } from './settings/theme-settings/reducers'
import weatherVisualizations, { defaultState as weatherVisualizationsDefaultState } from './settings/weather-visualization-settings/reducers'

const rootReducer = combineReducers({
	drawer,
	home,
	settings,
	theme,
	weatherVisualizations,
	router
})

export default rootReducer

export const defaultState = {
	drawer: drawerDefaultState,
	settings: settingsDefaultState,
	home: homeDefaultState,
	theme: themeDefaultState,
	weatherVisualizations: weatherVisualizationsDefaultState
}
