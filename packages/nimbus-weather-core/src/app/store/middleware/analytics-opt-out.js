import { LOCATION_CHANGE } from 'react-router-redux'
import gaDisable, { windowKey } from '../../settings/lib/ga-disable'

export default store => next => action => {
	const state = store.getState()

	if (
		action.type === LOCATION_CHANGE &&
		window &&
		// eslint-disable-next-line no-prototype-builtins
		!window.hasOwnProperty(windowKey)
	) {
		gaDisable(!state.settings.allowAnalytics)
	}

	return next(action)
}
