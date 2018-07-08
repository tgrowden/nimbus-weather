/* eslint-env jest */
import React from 'react'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import Home from './'
import { defaultState } from '../../reducers/home'
import mountWithRouter from '../../utils/mount'

const defaultProps = {
	...defaultState,
	home: {
		weatherApiError: false
	}
}

const mockStore = configureStore()

describe('Home', () => {
	it('Should render without error', () => {
		expect(() => {
			mountWithRouter(
				<Provider store={mockStore(defaultProps)}>
					<Home {...defaultProps} />
				</Provider>
			)
		}).not.toThrow()
	})
})
