import Store from '../../../store/configureStore'
import { addFavoriteLocation as add, removeFavoriteLocation as remove } from '../actions'

const { store } = Store

export const addFavoriteLocation = location => e => {
	e.preventDefault()
	e.stopPropagation()
	store.dispatch(add(location))
}

export const removeFavoriteLocation = location => e => {
	e.preventDefault()
	e.stopPropagation()
	store.dispatch(remove(location))
}
