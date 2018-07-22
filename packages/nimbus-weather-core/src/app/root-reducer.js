// @flow
import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import drawer, { defaultState as drawerDefaultState } from './drawer/reducers'
import settings, {
	defaultState as settingsDefaultState
} from './settings/reducers'
import home, { defaultState as homeDefaultState } from './home/reducers'
import theme, {
	defaultState as themeDefaultState
} from './settings/theme-settings/reducers'
import weatherVisualizations, {
	defaultState as weatherVisualizationsDefaultState
} from './settings/weather-visualization-settings/reducers'
import locationAutosuggest, {
	defaultState as locationAutosuggestDefaultState
} from './home/location-autosuggest/reducers'

export const reducers = {
	drawer,
	home,
	settings,
	theme,
	weatherVisualizations,
	locationAutosuggest,
	router
}

const rootReducer = combineReducers(reducers)

export default rootReducer

export const defaultState = {
	drawer: drawerDefaultState,
	settings: settingsDefaultState,
	home: homeDefaultState,
	theme: themeDefaultState,
	weatherVisualizations: weatherVisualizationsDefaultState,
	locationAutosuggest: locationAutosuggestDefaultState
}
