// @flow
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import * as Units from './lib/units'
import Summary from './summary'
import NearestStormDistance from './field/nearest-storm-distance'
import NearestStormBearing from './field/nearest-storm-bearing'
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
import FieldWrapper from './field/field-wrapper'
import Graphs from './graphs'

type Props = {
	classes: Object,
	timezone: string,
	units: Unit,
	weather: CurrentWeather,
	minutely: MinutelyWeather
}

const styles = (theme: MuiTheme) => ({
	root: {},
	graphWrapper: {
		maxWidth: theme.breakpoints.values.lg,
		marginLeft: 'auto',
		marginRight: 'auto'
	}
})

class Current extends React.Component<Props> {
	render() {
		const { classes, weather, timezone, minutely } = this.props
		const units = Units[this.props.units]

		return (
			<div className={classes.root}>
				<FieldWrapper>
					<Summary
						icon={weather.icon}
						time={weather.time}
						summary={weather.summary}
						timezone={timezone}
					/>
					<Temperature value={weather.temperature} units={units} />
					<ApparentTemperature
						value={weather.apparentTemperature}
						units={units}
					/>
					<PrecipitationProbability
						value={weather.precipProbability}
						units={units}
					/>
					<PrecipitationIntensity
						value={weather.precipIntensity}
						units={units}
					/>
					<NearestStormDistance
						value={weather.nearestStormDistance}
						units={units}
					/>
					<NearestStormBearing
						value={weather.nearestStormBearing}
						units={units}
					/>
					<DewPoint value={weather.dewPoint} units={units} />
					<Humidity value={weather.humidity} units={units} />
					<Wind
						windBearing={weather.windBearing}
						windSpeed={weather.windSpeed}
						units={units}
					/>
					<WindGust value={weather.windGust} units={units} />
					<CloudCover value={weather.cloudCover} units={units} />
					<UVIndex value={weather.uvIndex} />
					<Visibility value={weather.visibility} units={units} />
					<Ozone value={weather.ozone} units={units} />
				</FieldWrapper>
				{minutely &&
					minutely.data && (
					<div className={classes.graphWrapper}>
						<Graphs
							data={minutely.data}
							timezone={timezone}
							only="precip"
							onGraphChange={() => {}}
							graph="precip"
							precipDateFormat="h:mm a"
						/>
					</div>
				)}
			</div>
		)
	}
}

export default withStyles(styles)(Current)
