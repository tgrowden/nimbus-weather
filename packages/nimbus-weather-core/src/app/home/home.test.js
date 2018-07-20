/* eslint-env jest */
import React from 'react'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import Home from './'
import * as defaultState from '../../reducers/default-state'
import mountWithRouter from '../../utils/mount'

const defaultProps = {
	...defaultState,
	...defaultState.home
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
