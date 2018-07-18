import merge from 'deepmerge'
import * as defaultState from '../reducers/default-state'

export default inboundState => merge(defaultState, inboundState)
