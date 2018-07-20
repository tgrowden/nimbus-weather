/* eslint-env jest */
import { fahrenheitToCelsius, celsiusToFahrenheit } from './convert-temperature'

describe('fahrenheitToCelsius()', () => {
	it('Should convert the temperature correctly', () => {
		expect(fahrenheitToCelsius(5)).toEqual(-15)

		expect(fahrenheitToCelsius(-40)).toEqual(-40)
	})
})

describe('celsiusToFahrenheit()', () => {
	it('Should convert the temperature correctly', () => {
		expect(celsiusToFahrenheit(-15)).toEqual(5)

		expect(celsiusToFahrenheit(-40)).toEqual(-40)
	})
})
