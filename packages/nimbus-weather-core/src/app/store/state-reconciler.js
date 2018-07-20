import merge from 'deepmerge'
import { defaultState } from '../root-reducer'

export default inboundState => merge(defaultState, inboundState)
