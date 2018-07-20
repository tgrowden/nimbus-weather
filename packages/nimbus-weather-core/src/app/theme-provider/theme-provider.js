import React from 'react'
import type { Node } from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

type Props = {
	children: Node,
	theme: {
		palette: {
			type: MuiThemePaletteType
		}
	}
}

class ThemeProvider extends React.Component<Props> {
	render() {
		const { children, theme } = this.props

		return (
			<MuiThemeProvider theme={createMuiTheme(theme)}>
				{children}
			</MuiThemeProvider>
		)
	}
}

export default ThemeProvider
