// @flow
import React from 'react'
import * as Units from '../lib/units'
import PrecipitationIntensity from '../field/precipitation-intensity'
import PrecipitationProbability from '../field/precipitation-probability'
import Temperature from '../field/temperature'
import ApparentTemperature from '../field/apparent-temperature'
import DewPoint from '../field/dew-point'
import Humidity from '../field/humidity'
import WindGust from '../field/wind-gust'
import CloudCover from '../field/cloud-cover'
import UVIndex from '../field/uv-index'
import Visibility from '../field/visibility'
import Ozone from '../field/ozone'
import Wind from '../field/wind'
import Visualizations from '../visualizations'
import FieldWrapper from '../field/field-wrapper'
import WeatherIcon from '../weather-icon'
import formatDate from '../lib/format-date'
import WeatherCard from '../weather-card'

type Props = {
	timezone: string,
	units: Unit,
	weather: HourlyWeather,
	graph: GraphOptions,
	setHourlyGraph: (hourlyGraph: GraphOptions) => void
}

class Hourly extends React.Component<Props> {
	render() {
		const { weather, timezone, graph, setHourlyGraph } = this.props
		const units = Units[this.props.units]

		return (
			<React.Fragment>
				<Visualizations
					timezone={timezone}
					data={weather.data}
					exclude={['tempRange']}
					graph={graph}
					onGraphChange={setHourlyGraph}
					precipDateFormat="ddd h:mm a"
				/>
				<WeatherCard
					headerProps={{
						title: weather.summary
					}}
				/>
				{weather.data.map(hour => (
					<WeatherCard
						key={`hour-${hour.time}`}
						headerProps={{
							avatar: <WeatherIcon icon={hour.icon} />,
							title: formatDate({
								time: hour.time,
								timezone
							}),
							subheader: hour.summary
						}}
						content={
							<FieldWrapper key={`hour-${hour.time}`}>
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
						}
					/>
				))}
			</React.Fragment>
		)
	}
}

export default Hourly
