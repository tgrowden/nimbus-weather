// @flow
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as HomeActions from '../../../actions/home'
import * as Units from './lib/units'
import Summary from './summary'
import PrecipitationIntensity from './field/precipitation-intensity'
import PrecipitationProbability from './field/precipitation-probability'
import Temperature from './field/temperature'
import ApparentTemperature from './field/apparent-temperature'
import DewPoint from './field/dew-point'
import Humidity from './field/humidity'
import WindGust from './field/wind-gust'
import CloudCover from './field/cloud-cover'
import UVIndex from './field/uv-index'
import Visibility from './field/visibility'
import Ozone from './field/ozone'
import Wind from './field/wind'
import GeneralSummary from './general-summary'
import Graphs from './graphs'
import FieldWrapper from './field/field-wrapper'

type Props = {
	classes: Object,
	timezone: string,
	units: Unit,
	weather: HourlyWeather,
	graph: GraphOptions,
	setHourlyGraph: (hourlyGraph: GraphOptions) => void
}

const styles = (theme: MuiTheme) => ({
	hour: {
		borderBottom: `1px solid ${theme.palette.divider}`,
		'&:not(:first-of-type)': {
			paddingTop: theme.spacing.unit * 2
		},
		'&:not(:last-of-type)': {
			paddingBottom: theme.spacing.unit * 2
		},
		'&:last-of-type': {
			borderBottom: 'none'
		}
	}
})

class Hourly extends React.Component<Props> {
	render() {
		const { weather, classes, timezone, graph, setHourlyGraph } = this.props
		const units = Units[this.props.units]

		return (
			<div className={classes.root}>
				<Graphs
					timezone={timezone}
					data={weather.data}
					exclude={['tempRange']}
					graph={graph}
					onGraphChange={setHourlyGraph}
					precipDateFormat="ddd h:mm a"
				/>
				<GeneralSummary summary={weather.summary} />
				{weather.data.map(hour => (
					<FieldWrapper key={`hour-${hour.time}`}>
						<Summary
							icon={hour.icon}
							time={hour.time}
							summary={hour.summary}
							timezone={timezone}
						/>
						<Temperature value={hour.temperature} units={units} />
						<ApparentTemperature
							value={hour.apparentTemperature}
							units={units}
						/>
						<PrecipitationProbability
							value={hour.precipProbability}
							units={units}
						/>
						<PrecipitationIntensity
							value={hour.precipIntensity}
							units={units}
						/>
						<DewPoint value={hour.dewPoint} units={units} />
						<Humidity value={hour.humidity} units={units} />
						<Wind
							windBearing={hour.windBearing}
							windSpeed={hour.windSpeed}
							units={units}
						/>
						<WindGust value={hour.windGust} units={units} />
						<CloudCover value={hour.cloudCover} units={units} />
						<UVIndex value={hour.uvIndex} />
						<Visibility value={hour.visibility} units={units} />
						<Ozone value={hour.ozone} units={units} />
					</FieldWrapper>
				))}
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		graph: state.home.hourlyGraph
	}
}

function mapDispatchToProps(dispatch: *) {
	return bindActionCreators(HomeActions, dispatch)
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(Hourly))
