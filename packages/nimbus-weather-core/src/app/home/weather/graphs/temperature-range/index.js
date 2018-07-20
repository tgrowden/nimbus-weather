// @flow
import * as React from 'react'
import withWidth from '@material-ui/core/withWidth'
import formatDate from '../../lib/format-date'
import getUnits from '../../lib/units'
import TemperatureRangeGraph from './graph'
import TemperatureRangeTable from './table'

type Props = {
	data: WeatherData,
	timezone: string,
	dateFormat?: string,
	width: Width
}

class TemperatureRangeVisualization extends React.Component<Props>
	implements WeatherDataVisualization {
	units: Units

	static defaultProps = {
		dateFormat: 'ddd, MMM D'
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
			High: datum.temperatureHigh,
			Low: datum.temperatureLow
		}))
	}

	render() {
		const { width } = this.props

		const table = (
			<TemperatureRangeTable
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
				<TemperatureRangeGraph units={this.units} data={this.data} />
				{table}
			</React.Fragment>
		)
	}
}

export default withWidth()(TemperatureRangeVisualization)
