// @flow
import * as React from 'react'
import withWidth from '@material-ui/core/withWidth'
import formatDate from '../../lib/format-date'
import getUnits from '../../lib/units'
import PressureGraph from './graph'
import PressureTable from './table'

type Props = {
	data: HourlyWeatherData,
	timezone: string,
	dateFormat?: string,
	width: Width
}

class PressureVisualization extends React.Component<Props>
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
			Pressure: datum.pressure
		}))
	}

	render() {
		const { width } = this.props

		const table = (
			<PressureTable
				units={this.units}
				data={this.props.data}
				dateFormat={this.props.dateFormat}
				timezone={this.props.timezone}
			/>
		)

		if (width === 'xs') {
			return table
		}

		return (
			<React.Fragment>
				<PressureGraph units={this.units} data={this.data} />
				{table}
			</React.Fragment>
		)
	}
}

export default withWidth()(PressureVisualization)
