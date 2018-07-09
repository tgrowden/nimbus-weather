import axios from 'axios'
import Store from '../store/configureStore'
import { setWeatherApiError, setFetchingWeather } from '../actions/home'
import { apiHost } from '../../config'

const { store } = Store

export default ({ lat, lng }, preferredUnits: string = 'us') => {
	store.dispatch(setFetchingWeather(true))

	return axios
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
		.then((res) => {
			store.dispatch(setFetchingWeather(false))
			return res
		})
		.catch(() => {
			store.dispatch(setWeatherApiError(true))
			store.dispatch(setFetchingWeather(false))
		})
}
