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
import TemperatureRange from './field/temperature-range'
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
	weather: DailyWeather,
	graph: GraphOptions,
	setDailyGraph: (dailyGraph: GraphOptions) => void
}

const styles = (theme: MuiTheme) => ({
	day: {
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

class Daily extends React.Component<Props> {
	render() {
		const { weather, classes, timezone, graph, setDailyGraph } = this.props
		const units = Units[this.props.units]

		return (
			<div className={classes.root}>
				<Graphs
					timezone={timezone}
					data={weather.data}
					exclude={['temp']}
					graph={graph}
					onGraphChange={setDailyGraph}
				/>
				<GeneralSummary summary={weather.summary} />
				{weather.data.map(day => (
					<FieldWrapper key={`day-${day.time}`}>
						<Summary
							icon={day.icon}
							time={day.time}
							summary={day.summary}
							timezone={timezone}
							dateFormat="ddd, MMM D, YYYY"
						/>
						<TemperatureRange
							min={day.temperatureLow}
							max={day.temperatureHigh}
							units={units}
						/>
						<PrecipitationProbability
							value={day.precipProbability}
							units={units}
						/>
						<PrecipitationIntensity value={day.precipIntensity} units={units} />
						<DewPoint value={day.dewPoint} units={units} />
						<Humidity value={day.humidity} units={units} />
						<Wind
							windBearing={day.windBearing}
							windSpeed={day.windSpeed}
							units={units}
						/>
						<WindGust value={day.windGust} units={units} />
						<CloudCover value={day.cloudCover} units={units} />
						<UVIndex value={day.uvIndex} />
						<Visibility value={day.visibility} units={units} />
						<Ozone value={day.ozone} units={units} />
					</FieldWrapper>
				))}
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		graph: state.home.dailyGraph
	}
}

function mapDispatchToProps(dispatch: *) {
	return bindActionCreators(HomeActions, dispatch)
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(Daily))
