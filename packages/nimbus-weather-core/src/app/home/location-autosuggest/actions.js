export const SET_INPUT_VALUE = 'SET_LOCATION_AUTOSUGGEST_INPUT_VAL'

export function setInputValue(inputValue: string) {
	return {
		type: SET_INPUT_VALUE,
		inputValue
	}
}
