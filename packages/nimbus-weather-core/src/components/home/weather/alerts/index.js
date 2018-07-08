import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Alert from './alert'

const styles = (theme: MuiTheme) => ({
	root: {},
	alertWrapper: {
		marginBottom: theme.spacing.unit * 2
	}
})

type Props = {
	alerts: WeatherAlerts,
	classes: Object,
	timezone: string
}

class Alerts extends React.Component<Props> {
	render() {
		const { classes, alerts, timezone } = this.props
		return (
			<div className={classes.root}>
				{/* eslint-disable react/no-array-index-key  */}
				{alerts.map((alert, i) => (
					<div
						className={classes.alertWrapper}
						key={`alert-${alert.time}-${i}`}
					>
						<Alert data={alert} timezone={timezone} />
					</div>
				))}
				{/* eslint-enable react/no-array-index-key  */}
			</div>
		)
	}
}

export default withStyles(styles)(Alerts)
