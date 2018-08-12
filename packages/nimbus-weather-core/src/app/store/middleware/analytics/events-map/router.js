import { LOCATION_CHANGE } from 'react-router-redux'
import { trackPageView } from '@redux-beacon/google-analytics-gtag'

export default {
	[LOCATION_CHANGE]: trackPageView(action => ({
		path: action.payload.pathname
	}))
}
