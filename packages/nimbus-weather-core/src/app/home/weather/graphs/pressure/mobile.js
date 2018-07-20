import * as React from 'react'
import WeatherDataTable from '../weather-data-table'
import formatDate from '../../lib/format-date'

type Props = {
	dateFormat: string,
	timezone: string,
	data: WeatherData
}

class MobilePressure extends React.Component<Props> {
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
						key: 'pressure',
						label: 'Pressure',
						numeric: true,
						formatter: (item, units) => `${item} ${units.pressure}`
					}
				]}
				{...props}
			/>
		)
	}
}

export default MobilePressure
