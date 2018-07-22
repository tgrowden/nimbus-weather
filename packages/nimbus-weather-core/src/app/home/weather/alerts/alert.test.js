/* eslint-env jest */
import { formatRegions } from './alert'

describe('Alert', () => {
	it('Should returned `undefined` for an empty array', () => {
		expect(formatRegions([])).toEqual(undefined)
	})
	it('Should return the only string with a length of 1', () => {
		expect(formatRegions(['foo'])).toEqual('foo')
	})
	it('Should return a properly formatted string if containing exactly two regions', () => {
		expect(formatRegions(['foo', 'bar'])).toEqual('foo and bar')
	})
	it('Should properly format a list of regions with 3 or more items', () => {
		const regions = ['foo', 'bar', 'baz', 'qux']
		expect(formatRegions(regions)).toEqual('foo, bar, baz, and qux')
	})
})
