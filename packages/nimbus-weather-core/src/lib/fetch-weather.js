import axios from 'axios'
import { store } from '../store/configureStore'
import { setWeatherApiError } from '../actions/home'
import { apiHost } from '../../config'

export default ({ lat, lng }, preferredUnits: string = 'us') =>
	axios
		.get(
			`${apiHost}/forecast`,
			{
				params: {
					lat,
					lng,
					units: preferredUnits
				}
			}
		)
		.then(res => res.data)
		.catch(() => {
			store.dispatch(setWeatherApiError(true))
		})
