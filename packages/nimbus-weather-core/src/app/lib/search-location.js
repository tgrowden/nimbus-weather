// @flow
import axios from 'axios'

export const apiEndpoint = 'https://nominatim.openstreetmap.org/search'

export default async (query: string, format?: string = 'jsonv2') => {
	try {
		const res = await axios.get(apiEndpoint, {
			params: {
				q: query,
				format
			}
		})

		return res.data
	} catch (e) {
		// do nothing
	}
}
