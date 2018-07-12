import * as React from 'react'
import WeatherDataTable from '../weather-data-table'
import formatDate from '../../lib/format-date'

type Props = {
	dateFormat: string,
	timezone: string,
	units: Units,
	data: HourlyWeatherData
}

class MobileTemperature extends React.Component<Props> {
	render() {
		const { data, dateFormat, timezone, units, ...props } = this.props

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
						key: 'temperature',
						label: 'Temperature',
						numeric: true,
						formatter: item => `${item}${units.temperature}`
					}
				]}
				{...props}
			/>
		)
	}
}

export default MobileTemperature
