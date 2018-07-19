// @flow
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
// $FlowFixMe flow-mono error maybe?
import { differenceInMilliseconds } from 'date-fns'
import { AppBar, Tabs, Tab, Paper } from '@material-ui/core'
import Current from './current'
import Hourly from './hourly'
import Daily from './daily'
import Alerts from './alerts'

const VIEWS = {
	current: 0,
	hourly: 1,
	daily: 2,
	alerts: 3
}

const styles = (theme: MuiTheme) => ({
	root: {
		maxWidth: `calc(100vw - ${theme.spacing.unit * 6}px)`
	},
	buttonContainer: {
		position: 'fixed',
		bottom: theme.spacing.unit * 2,
		right: theme.spacing.unit * 2
	},
	loading: {
		animation: 'spin 1s linear infinite'
	},
	'@keyframes spin': {
		'100%': {
			transform: 'rotate(360deg)'
		}
	},
	weatherContainer: {
		justifyContent: 'center',
		display: 'flex',
		flexDirection: 'column',
		marginLeft: 'auto',
		marginRight: 'auto',
		padding: theme.spacing.unit * 4
	}
})

type Props = {
	classes: Object,
	weather: Weather,
	fetchWeather: () => void,
	activeTab: number,
	setActiveTab: (activeTab: number) => void,
	fetchingWeather: boolean
}

class WeatherApp extends React.Component<Props> {
	static get durationBeforeNewFetch() {
		return 600000 // 10 minutes
	}

	componentWillMount() {
		const fetched: number = this.props.weather.fetched || 0
		const now = Date.now()
		const diff = differenceInMilliseconds(Date.now(), fetched)
		if (fetched > now || diff > WeatherApp.durationBeforeNewFetch) {
			this.props.fetchWeather()
		}
	}

	get alertsDisabled(): boolean {
		const { weather } = this.props

		return !weather.alerts || !weather.alerts.length
	}

	get activeTab() {
		const { activeTab } = this.props
		if (activeTab === VIEWS.alerts && this.alertsDisabled) {
			return VIEWS.current
		}

		return activeTab
	}

	get activeView() {
		const { weather } = this.props

		const units = (weather && weather.flags && weather.flags.units) || undefined

		switch (this.activeTab) {
			case VIEWS.hourly:
				return (
					<Hourly
						weather={weather.hourly}
						timezone={weather.timezone}
						units={units}
					/>
				)
			case VIEWS.daily:
				return (
					<Daily
						weather={weather.daily}
						timezone={weather.timezone}
						units={units}
					/>
				)
			case VIEWS.alerts:
				return <Alerts alerts={weather.alerts} timezone={weather.timezone} />
			default:
				return (
					<Current
						weather={weather.currently}
						minutely={weather.minutely}
						timezone={weather.timezone}
						units={units}
					/>
				)
		}
	}

	render() {
		const { classes, setActiveTab } = this.props

		return (
			<div className={classes.root}>
				<Paper>
					<AppBar position="static">
						<Tabs
							value={this.activeTab}
							onChange={(e, tabIndex) => {
								setActiveTab(tabIndex)
							}}
							scrollable
							scrollButtons="auto"
						>
							<Tab label="Current" />
							<Tab label="Hourly" />
							<Tab label="Daily" />
							<Tab label="Alerts" disabled={this.alertsDisabled} />
						</Tabs>
					</AppBar>
					<div className={classes.weatherContainer}>{this.activeView}</div>
				</Paper>
			</div>
		)
	}
}

export default withStyles(styles)(WeatherApp)
