/* eslint-env jest */
import mockAxios from 'jest-mock-axios'
import { mockStore, defaultState } from '../utils/mock-store'
import { fetchWeather, geolocate } from './actions'
import { apiHost } from '../../config'

afterEach(() => {
	mockAxios.reset()
})

describe('Home Actions', () => {
	describe('fetchWeather()', () => {
		function getQueryParams(state) {
			return {
				params: {
					lat: state.home.location.coords.lat,
					lng: state.home.location.coords.lng,
					units: state.weatherVisualizations.preferredUnits
				}
			}
		}

		it('Should fetch from the configured custom API host if defined', () => {
			const customWeatherApiHost = 'https://foo.bar'

			const initialState = {
				...defaultState,
				settings: {
					...defaultState.settings,
					customWeatherApiHost
				}
			}

			const store = mockStore(initialState)

			store.dispatch(fetchWeather())

			expect(mockAxios.get).toHaveBeenCalledWith(
				`${customWeatherApiHost}/forecast`,
				getQueryParams(initialState)
			)
		})

		it('Should fetch from the default API host if no custom host is defined', () => {
			const store = mockStore(defaultState)

			store.dispatch(fetchWeather())

			expect(mockAxios.get).toHaveBeenCalledWith(
				`${apiHost}/forecast`,
				getQueryParams(defaultState)
			)
		})
	})

	describe('geolocate()', () => {
		const getCurrentPosition = jest.fn()

		global.navigator.geolocation = {
			getCurrentPosition
		}

		it('Should request geolocation with the configured options', () => {
			const geolocationTimeout = 69000
			const geolocationHighAccuracy = false

			const store = mockStore({
				...defaultState,
				settings: {
					...defaultState.settings,
					geolocationTimeout,
					geolocationHighAccuracy
				}
			})

			store.dispatch(geolocate())

			expect(getCurrentPosition).toHaveBeenCalledWith(
				expect.any(Function),
				expect.any(Function),
				{
					enableHighAccuracy: geolocationHighAccuracy,
					timeout: geolocationTimeout
				}
			)
		})
	})
})
