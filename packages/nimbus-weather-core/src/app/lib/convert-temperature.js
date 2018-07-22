// @flow

export function fahrenheitToCelsius(
	temp: number,
	round: boolean = true
): number {
	const res = ((temp - 32) * 5) / 9
	if (round) return parseInt(res, 10)

	return res
}

export function celsiusToFahrenheit(
	temp: number,
	round: boolean = true
): number {
	const res = (9 / 5) * temp + 32
	if (round) return parseInt(res, 10)

	return res
}
