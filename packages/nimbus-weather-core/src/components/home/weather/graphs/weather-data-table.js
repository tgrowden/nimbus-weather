// @flow
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import getUnits from '../lib/units'
import WeatherDataExpansionPanel from './weather-data-expansion-panel'

const styles = theme => ({
	root: {
		width: '100%'
	},
	tableWrapper: {
		overflowX: 'auto'
	},
	tableCell: {
		paddingLeft: theme.spacing.unit,
		paddingRight: theme.spacing.unit
	}
})

type Props = {
	classes: Object,
	theme: MuiTheme,
	data: Array<{
		[key: string]: string | number
	}>,
	fields: Array<{
		label?: string,
		key: string,
		numeric?: boolean,
		formatter?: (value: string | number, units: Units) => any,
		sortable?: boolean,
		styleFormatter?: ({
			value: string | number,
			theme: MuiTheme
		}) => { [key: string]: string }
	}>
}

type State = {
	order: 'asc' | 'desc',
	orderBy: string
}

function getSorting(order, orderBy) {
	return order === 'desc'
		? // $FlowFixMe
		  (a, b) => (parseFloat(b[orderBy]) < parseFloat(a[orderBy]) ? -1 : 1)
		: // $FlowFixMe
		  (a, b) => (parseFloat(a[orderBy]) < parseFloat(b[orderBy]) ? -1 : 1)
}

class WeatherDataTable extends React.Component<Props, State> {
	constructor(props) {
		super(props)

		this.state = {
			order: 'asc',
			orderBy: 'time'
		}
	}

	handleRequestSort = property => {
		const orderBy = property
		let order = 'desc'

		if (this.state.orderBy === property && this.state.order === 'desc') {
			order = 'asc'
		}

		this.setState({ order, orderBy })
	}

	render() {
		const { classes, data, fields, theme } = this.props
		const { order, orderBy } = this.state
		const units = getUnits()

		return (
			<WeatherDataExpansionPanel>
				<div className={classes.root}>
					<div className={classes.tableWrapper}>
						<Table className={classes.table} aria-labelledby="Weather Data">
							<TableHead>
								<TableRow>
									{fields.map(field => {
										/* eslint-disable no-prototype-builtins */
										const sortable = field.hasOwnProperty('sortable')
											? field.sortable
											: true
										/* eslint-disable no-prototype-builtins */

										return (
											<TableCell
												key={field.key}
												numeric={field.numeric}
												padding="none"
												className={classes.tableCell}
												sortDirection={orderBy === field.key ? order : false}
											>
												{sortable ? (
													<TableSortLabel
														active={orderBy === field.key}
														direction={order}
														onClick={this.handleRequestSort.bind(
															this,
															field.key
														)}
													>
														{field.label || field.key}
													</TableSortLabel>
												) : (
													field.label || field.key
												)}
											</TableCell>
										)
									})}
								</TableRow>
							</TableHead>
							<TableBody>
								{/* eslint-disable react/no-array-index-key */
									data
										.sort(getSorting(order, orderBy))
										.map((datum, datumIndex) => (
											<TableRow tabIndex={-1} key={`row-${datumIndex}`}>
												{fields.map((field, fieldIndex) => {
												/* eslint-disable no-prototype-builtins */
													if (!datum.hasOwnProperty(field.key)) return null
													/* eslint-enable no-prototype-builtins */
													const item = datum[field.key]

													return (
														<TableCell
															key={`cell-${datumIndex}-${fieldIndex}-${item}`}
															numeric={!!field.numeric}
															padding="none"
															className={classes.tableCell}
															style={
																!!field.styleFormatter &&
															typeof field.styleFormatter === 'function'
																	? field.styleFormatter({ value: item, theme })
																	: undefined
															}
														>
															{!!field.formatter &&
														typeof field.formatter === 'function'
																? field.formatter(item, units)
																: item}
														</TableCell>
													)
												})}
											</TableRow>
										))
								/* eslint-enable react/no-array-index-key */
								}
							</TableBody>
						</Table>
					</div>
				</div>
			</WeatherDataExpansionPanel>
		)
	}
}

export default withStyles(styles, { withTheme: true })(WeatherDataTable)
