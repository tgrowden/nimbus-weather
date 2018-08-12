import { trackEvent } from '@redux-beacon/google-analytics-gtag'
import {
	CLOSE_DRAWER,
	OPEN_DRAWER,
	TOGGLE_DRAWER
} from '../../../../drawer/consts'

const category = 'drawer'

export default {
	[CLOSE_DRAWER]: trackEvent(() => ({
		category,
		action: 'close'
	})),
	[OPEN_DRAWER]: trackEvent(() => ({
		category,
		action: 'open'
	})),
	[TOGGLE_DRAWER]: trackEvent((action, prevState, nextState) => {
		const actionName = nextState.drawer.open ? 'open' : 'close'

		return {
			category,
			action: actionName
		}
	})
}
