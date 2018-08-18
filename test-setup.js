/* eslint-env jest */
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

window.require = () => ({
	shell: {
		openExternal: jest.fn()
	}
})

window.gtag = jest.fn()
