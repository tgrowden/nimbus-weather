import { LOCATION_CHANGE } from 'react-router-redux'
import { CLOSE_DRAWER } from '../../actions/drawer'

export default store => next => action => {
	const state = store.getState()

	if (action.type === LOCATION_CHANGE && state.drawer.open) {
		store.dispatch({
			type: CLOSE_DRAWER
		})
	}

	return next(action)
}
