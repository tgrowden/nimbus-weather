// @flow

export function fahrenheitToCelsius(temp: number) {
	return (temp - 32) * 5 / 9
}

export function celsiusToFahrenheit(temp: number) {
	return 9 / 5 * temp + 32
}
