/* eslint-env jest */
import React from 'react'
import { mount } from 'enzyme'
import Link from './link'
import { event } from '../lib/analytics'
import open, { getIsElectron } from '../lib/open'

jest.mock('../lib/analytics')
jest.mock('../lib/open')

afterEach(() => {
	event.mockReset()
	getIsElectron.mockReturnValue(false)
})

describe('Link', () => {
	describe('analyticsProps', () => {
		it('Should fire an analytics event by default', () => {
			const wrapper = mount(<Link>foo</Link>)

			wrapper.find(Link).simulate('click')

			expect(event).toHaveBeenCalled()
		})

		it('Should fire an analytics event with the defaultProps by default', () => {
			const wrapper = mount(<Link>foo</Link>)

			wrapper.find(Link).simulate('click')

			const { analyticsProps } = Link.defaultProps

			expect(event).toHaveBeenCalledWith(analyticsProps.action, {
				category: analyticsProps.category,
				value: analyticsProps.value
			})
		})

		it('Should fire an analytics event with the passed props if provided', () => {
			const analyticsProps = {
				label: 'foo',
				category: 'bar',
				action: 'baz'
			}

			const wrapper = mount(<Link analyticsProps={analyticsProps}>foo</Link>)

			wrapper.find(Link).simulate('click')

			const { action, ...otherProps } = analyticsProps

			expect(event).toHaveBeenCalledWith(action, otherProps)
		})

		it('Should fire an analytics event with link href if not passed `analyticsProps.label`', () => {
			const href = '/foobar'
			const wrapper = mount(<Link href={href}>foo</Link>)

			wrapper.find(Link).simulate('click')

			const { analyticsProps } = Link.defaultProps

			expect(event).toHaveBeenCalledWith(analyticsProps.action, {
				category: analyticsProps.category,
				value: analyticsProps.value,
				label: href
			})
		})

		it('Should not call an analytics event when passed truthy `disable`', () => {
			const wrapper = mount(<Link analyticsProps={{ disable: true }}>foo</Link>)

			wrapper.find(Link).simulate('click')

			expect(window.gtag).not.toHaveBeenCalled()
		})
	})

	it('Should open the links externally in the Electron app', () => {
		getIsElectron.mockReturnValue(true)

		const href = 'https://github.com'

		const wrapper = mount(<Link href={href}>Github</Link>)

		wrapper.find(Link).simulate('click')

		expect(open).toHaveBeenCalledWith(href)
	})
})
