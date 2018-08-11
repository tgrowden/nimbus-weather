import * as consts from './consts'

export function setThemeType(themePaletteType: MuiThemePaletteType) {
	return {
		type: consts.SET_THEME_PALETTE_TYPE,
		themePaletteType
	}
}

export function setPrimaryColor(primaryColor: string) {
	return {
		type: consts.SET_PRIMARY_COLOR,
		primaryColor
	}
}

export function setSecondaryColor(secondaryColor: string) {
	return {
		type: consts.SET_SECONDARY_COLOR,
		secondaryColor
	}
}

export function setErrorColor(errorColor: string) {
	return {
		type: consts.SET_ERROR_COLOR,
		errorColor
	}
}
