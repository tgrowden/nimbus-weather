import * as Colors from '@material-ui/core/colors'

function normalizeColors() {
	const res = {}

	Object.keys(Colors)
		.forEach(colorKey => {
			const color = Colors[colorKey]
			if (colorKey === 'common' || !color[500]) return

			res[colorKey] = {
				...color,
				main: color.main || color[500],
				dark: color.dark || color[700],
				light: color.light || color[300]
			}
		})

	return res
}

const colors = normalizeColors()

export default colors

export const colorOptions = Object.keys(colors)
	.sort()
	.map(color => ({
		value: color,
		label: color
			.replace(/([A-Z])/g, ' $1')
			.replace(/^./, str => str.toUpperCase())
	}))
