import { trackEvent } from '@redux-beacon/google-analytics-gtag'
import { PURGE } from 'redux-persist'

const category = 'persistor'

export default {
	[PURGE]: trackEvent(() => ({
		category,
		action: 'purge'
	}))
}
