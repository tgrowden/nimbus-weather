import * as React from 'react'
import WeatherDataTable from '../weather-data-table'
import formatDate from '../../lib/format-date'

type Props = {
	dateFormat: string,
	timezone: string,
	data: HourlyWeatherData
}

class TemperatureRangeTable extends React.Component<Props> {
	render() {
		const { data, dateFormat, timezone, ...props } = this.props

		return (
			<WeatherDataTable
				data={data}
				fields={[
					{
						key: 'time',
						label: 'Date',
						formatter: time =>
							formatDate({
								time,
								timezone,
								format: dateFormat
							})
					},
					{
						key: 'temperatureLow',
						label: 'Low',
						numeric: true,
						formatter: (low, units) => `${low}${units.temperatureLow}`
					},
					{
						key: 'temperatureHigh',
						label: 'High',
						numeric: true,
						formatter: (high, units) => `${high}${units.temperatureHigh}`
					}
				]}
				{...props}
			/>
		)
	}
}

export default TemperatureRangeTable
