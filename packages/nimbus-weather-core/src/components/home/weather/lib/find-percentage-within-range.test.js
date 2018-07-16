/* eslint-env jest */
import calculate from './find-percentage-within-range'

describe('findPercentageWithinRange', () => {
	it('Should calculate the proper values', () => {
		expect(
			calculate({
				dataSet: [0, 1, 99, 100],
				value: 99
			})
		).toEqual(0.99)

		expect(
			calculate({
				dataSet: [-50, -17, 0, 17, 50],
				value: 50
			})
		).toEqual(1)

		expect(
			calculate({
				dataSet: [-27, 100],
				value: -27
			})
		).toEqual(0)

		expect(
			calculate({
				dataSet: [-1, 0, 1],
				value: 0
			})
		).toEqual(0.5)

		expect(
			calculate({
				dataSet: [50, 46, 195, 70],
				value: 65
			})
		).toEqual(0.12751677852348994)

		expect(
			calculate({
				dataSet: [0, -100],
				value: -99
			})
		).toEqual(0.01)
	})

	it('Should throw an error when the value is out of range of the dataset', () => {
		expect(() => {
			calculate({
				dataSet: [0, 100],
				value: 101
			})
		}).toThrow()

		expect(() => {
			calculate({
				dataSet: [0, 100],
				value: -1
			})
		}).toThrow()

		expect(() => {
			calculate({
				dataSet: [],
				value: 1
			})
		}).toThrow()

		expect(() => {
			calculate({
				dataSet: [],
				value: -1
			})
		}).toThrow()
	})
})
