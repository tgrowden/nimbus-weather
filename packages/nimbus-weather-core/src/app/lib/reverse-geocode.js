// @flow
import axios from 'axios'

export const apiEndpoint = 'https://nominatim.openstreetmap.org/reverse'

type AddressDetails = 0 | 1

export default async (
	coords: Coords,
	format?: string = 'jsonv2',
	addressdetails?: AddressDetails = 1
) => {
	try {
		const res = await axios.get(apiEndpoint, {
			params: {
				addressdetails,
				format,
				lat: coords.lat,
				lon: coords.lng
			}
		})

		return res.data
	} catch (e) {
		return {}
	}
}
