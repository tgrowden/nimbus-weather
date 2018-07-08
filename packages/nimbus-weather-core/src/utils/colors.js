import * as colors from '@material-ui/core/colors'

export default colors

export const colorOptions = Object.keys(colors)
	.sort()
	.filter(color => color !== 'common')
	.map(color => ({
		value: color,
		label: color
			.replace(/([A-Z])/g, ' $1')
			.replace(/^./, str => str.toUpperCase())
	}))
