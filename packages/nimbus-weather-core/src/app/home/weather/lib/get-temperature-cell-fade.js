import findPercentageWithinRange from './find-percentage-within-range'
import Store from '../../../../store/configureStore'

const { store } = Store

const { coldTemp, hotTemp } = store.getState().weatherVisualizations

/*
Values are in degrees Fahrenheit.
Fairly arbitrary values, but most I feel like most people
would agree with the values being pretty fucking
hot/cold respectively.
*/
export const MAX_HOT_TEMPERATURE = 110
export const MIN_COLD_TEMPERATURE = 0

export const MIN_HOT_TEMPERATURE = 65
export const MAX_COLD_TEMPERATURE = 55

export const values = {
	cold: {
		min: MIN_COLD_TEMPERATURE,
		max: MAX_COLD_TEMPERATURE
	},
	hot: {
		min: MIN_HOT_TEMPERATURE,
		max: MAX_HOT_TEMPERATURE
	}
}

export default (value: number) => {
	console.log(value)
	let res: number = 0
	if (value <= hotTemp && value >= coldTemp) return res

	let dataSet: Array<number>

	if (value > MIN_HOT_TEMPERATURE) {
		dataSet = [ value, MAX_HOT_TEMPERATURE]
	} else {
		dataSet = [ value, MIN_COLD_TEMPERATURE]
	}

	res = findPercentageWithinRange({ value, dataSet })

	// if (value < MAX_COLD_TEMPERATURE) {
	// 	res = 1 - res
	// }

	return res
}
