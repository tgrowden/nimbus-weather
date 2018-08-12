import { trackEvent } from '@redux-beacon/google-analytics-gtag'
import {
	SET_THEME_PALETTE_TYPE,
	SET_PRIMARY_COLOR,
	SET_SECONDARY_COLOR,
	SET_ERROR_COLOR
} from '../../../../settings/theme-settings/consts'

const category = 'themeSettings'

export default {
	[SET_THEME_PALETTE_TYPE]: trackEvent((action, prevState, nextState) => ({
		category,
		action: 'setPaletteType',
		label: nextState.theme.themePaletteType
	})),
	[SET_PRIMARY_COLOR]: trackEvent((action, prevState, nextState) => ({
		category,
		action: 'setPrimaryColor',
		label: nextState.theme.primaryColor
	})),
	[SET_SECONDARY_COLOR]: trackEvent((action, prevState, nextState) => ({
		category,
		action: 'setSecondaryColor',
		label: nextState.theme.secondaryColor
	})),
	[SET_ERROR_COLOR]: trackEvent((action, prevState, nextState) => ({
		category,
		action: 'setErrorColor',
		label: nextState.theme.errorColor
	}))
}
