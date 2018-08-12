import { trackEvent } from '@redux-beacon/google-analytics-gtag'
import {
	SET_DESKTOP_TABLE_EXPANDED,
	SET_MOBILE_TABLE_EXPANDED,
	SET_PREFERRED_UNITS
} from '../../../../settings/weather-visualization-settings/consts'

const category = 'weatherVisualizations'

export default {
	[SET_DESKTOP_TABLE_EXPANDED]: trackEvent((action, prevState, nextState) => ({
		category,
		action: 'setDesktopTableExpanded',
		label: nextState.weatherVisualizations.desktopTableExpanded
	})),
	[SET_MOBILE_TABLE_EXPANDED]: trackEvent((action, prevState, nextState) => ({
		category,
		action: 'setMobileTableExpanded',
		label: nextState.weatherVisualizations.mobileTableExpanded
	})),
	[SET_PREFERRED_UNITS]: trackEvent((action, prevState, nextState) => ({
		category,
		action: 'setPreferredUnits',
		label: nextState.weatherVisualizations.preferredUnits
	}))
}
