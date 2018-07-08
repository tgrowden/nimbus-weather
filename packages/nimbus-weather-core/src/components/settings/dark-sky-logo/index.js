// @flow
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import LogoDarkBackground from './logo-dark-background'
import LogoLightBackground from './logo-light-background'
import Link from '../../link'

const styles = {
	img: {
		width: 150,
		height: 'auto',
		cursor: 'pointer'
	}
}

type Props = {
	classes: Object,
	theme: MuiTheme
}

export const poweredByLink = 'https://darksky.net/poweredby/'

class DarkSkyLogo extends React.Component<Props> {
	get imgSrc() {
		const { theme } = this.props

		return theme.palette.type === 'dark' ? LogoDarkBackground : LogoLightBackground
	}

	render() {
		const { classes } = this.props

		return (
			<Link href={poweredByLink}>
				<img
					className={classes.img}
					src={this.imgSrc}
					alt="Powered by Dark Sky"
				/>
			</Link>
		)
	}
}

export default withStyles(styles, { withTheme: true })(DarkSkyLogo)
