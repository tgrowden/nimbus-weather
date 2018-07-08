// @flow
import prod from './configureStore.prod'
import dev from './configureStore.dev'

// eslint-disable-next-line import/no-mutable-exports
let res

if (process.env.NODE_ENV === 'production') {
	res = prod
} else {
	res = dev
}

export default res
