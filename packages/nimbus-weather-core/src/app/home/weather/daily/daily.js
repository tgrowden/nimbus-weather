// @flow
import React from 'react'
import * as Units from '../lib/units'
import PrecipitationIntensity from '../field/precipitation-intensity'
import PrecipitationProbability from '../field/precipitation-probability'
import TemperatureRange from '../field/temperature-range'
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
	weather: DailyWeather,
	graph: GraphOptions,
	setDailyGraph: (dailyGraph: GraphOptions) => void
}

class Daily extends React.Component<Props> {
	render() {
		const { weather, timezone, graph, setDailyGraph } = this.props
		const units = Units[this.props.units]

		return (
			<React.Fragment>
				<Visualizations
					timezone={timezone}
					data={weather.data}
					exclude={['temp']}
					graph={graph}
					onGraphChange={setDailyGraph}
				/>
				{weather.data.map(day => (
					<WeatherCard
						key={`day-${day.time}`}
						headerProps={{
							avatar: <WeatherIcon icon={day.icon} />,
							title: formatDate({
								time: day.time,
								timezone,
								format: 'ddd, MMM D, YYYY'
							}),
							subheader: day.summary
						}}
						content={
							<FieldWrapper>
								<TemperatureRange
									min={day.temperatureLow}
									max={day.temperatureHigh}
									units={units}
								/>
								<PrecipitationProbability
									value={day.precipProbability}
									units={units}
								/>
								<PrecipitationIntensity
									value={day.precipIntensity}
									units={units}
								/>
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
						}
					/>
				))}
			</React.Fragment>
		)
	}
}

export default Daily
