// @flow
import * as React from 'react'
import withWidth from '@material-ui/core/withWidth'
import formatDate from '../../lib/format-date'
import getUnits from '../../lib/units'
import DesktopTemperature from './desktop'

type Props = {
	data: HourlyWeatherData,
	timezone: string,
	dateFormat?: string,
	width: Width
}

class TemperatureVisualization extends React.Component<Props>
	implements WeatherDataVisualization {
	units: Units

	static defaultProps = {
		dateFormat: 'ddd h:mm a'
	}

	constructor(props) {
		super(props)

		this.units = getUnits()
	}

	get data() {
		const { data, timezone, dateFormat } = this.props

		return data.map(datum => ({
			...datum,
			time: formatDate({
				time: datum.time,
				timezone,
				format: dateFormat
			}),
			Temperature: datum.temperature
		}))
	}

	render() {
		const { width } = this.props

		if (width === 'xs') {
			return null
		}

		return <DesktopTemperature units={this.units} data={this.data} />
	}
}

export default withWidth()(TemperatureVisualization)
