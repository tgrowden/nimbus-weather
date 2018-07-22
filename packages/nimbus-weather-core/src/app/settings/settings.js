// @flow
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import AdvancedSettings from './advanced-settings'
import ThemeSettings from './theme-settings'
import DarkSkyLogo from './dark-sky-logo'

const styles = (theme: MuiTheme) => ({
	gridItem: {
		paddingBottom: theme.spacing.unit
	},
	advancedSettingsWrapper: {
		marginTop: theme.spacing.unit * 3
	},
	logoWrapper: {
		display: 'flex',
		marginTop: theme.spacing.unit * 3,
		justifyContent: 'flex-end'
	}
})

type Props = {
	classes: Object
}

class Settings extends React.Component<Props> {
	render() {
		const { classes } = this.props

		return (
			<div className={classes.root}>
				<div>
					<ThemeSettings />
				</div>
				<div className={classes.advancedSettingsWrapper}>
					<AdvancedSettings />
				</div>
				<div className={classes.logoWrapper}>
					<DarkSkyLogo />
				</div>
			</div>
		)
	}
}

export default withStyles(styles)(Settings)
