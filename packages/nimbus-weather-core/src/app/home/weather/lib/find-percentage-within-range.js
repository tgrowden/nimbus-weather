// @flow
export type Args = {
	dataSet: Array<number>,
	value: number
}

export default ({ dataSet, value }: Args) => {
	const max = Math.max(...dataSet)
	const min = Math.min(...dataSet)
	if (value > max || value < min)
		throw new Error('Value is out of range of dataset')

	const range = max - min
	const adjustedValue = value - min

	return adjustedValue / range
}
