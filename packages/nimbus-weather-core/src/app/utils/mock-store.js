import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

export { defaultState } from '../root-reducer'

const middlewares = [thunk]

export const mockStore = configureStore(middlewares)
