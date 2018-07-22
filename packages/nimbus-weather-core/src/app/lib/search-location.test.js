/* eslint-env jest */
import searchLocation from './search-location'

describe('searchLocation()', async () => {
	it('Should return a response without failing', async () => {
		expect(async () => {
			await searchLocation('New York, NY')
		}).not.toThrow()
	})
})
