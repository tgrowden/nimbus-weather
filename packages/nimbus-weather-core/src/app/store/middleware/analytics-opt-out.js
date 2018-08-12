import { REHYDRATE } from 'redux-persist'
import { SET_ALLOW_ANALYTICS } from '../../settings/consts'
import { gaTrackingId } from '../../../config'

export default store => next => action => {
	const state = store.getState()

	if (
		window &&
		(action.type === REHYDRATE || action.type === SET_ALLOW_ANALYTICS)
	) {
		window[`ga-disable-${gaTrackingId}`] = !state.settings.allowAnalytics
	}

	return next(action)
}
