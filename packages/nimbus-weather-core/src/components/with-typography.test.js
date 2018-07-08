/* eslint-env jest */
import React from 'react'
import { mount } from 'enzyme'
import withTypography from './with-typography'

describe('withTypography()', () => {
	it('Should wrap text in a `Typography` component', () => {
		const wrapper = mount(withTypography('foo bar baz'))
		expect(wrapper.find('Typography')).toHaveLength(1)
		expect(wrapper.find('Typography').text()).toEqual('foo bar baz')
	})

	it('Should not wrap other components in a `Typography` component', () => {
		const wrapper = mount(withTypography(<span>foo bar baz</span>))
		expect(wrapper.find('Typography')).toHaveLength(0)
		expect(wrapper.find('span')).toHaveLength(1)
	})
})
