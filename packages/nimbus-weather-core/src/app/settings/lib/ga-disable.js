// @flow
import debug from '../../lib/debug'
import { gaTrackingId } from '../../../config'

export const windowKey = `ga-disable-${gaTrackingId}`

export default (disable: boolean): void => {
	if (!window || !gaTrackingId) return

	window[windowKey] = disable
	debug('analytics')(`${disable ? 'Disabling' : 'Enabling'} analytics`)
}
