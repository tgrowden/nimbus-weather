import { LOCATION_CHANGE } from 'react-router-redux'
import { CLOSE_DRAWER } from '../../actions/drawer'

export default store => next => action => {
	if (action.type === LOCATION_CHANGE) {
		store.dispatch({
			type: CLOSE_DRAWER
		})
	}

	return next(action)
}
