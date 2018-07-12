// @flow
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'

const styles = theme => ({
	root: {
		width: '100%',
		marginTop: theme.spacing.unit * 3
	},
	tableWrapper: {
		overflowX: 'auto'
	}
})

type Props = {
	classes: Object,
	data: Array<{
		[key: string]: string | number
	}>,
	fields: Array<{
		label?: string,
		key: string,
		numeric?: boolean,
		formatter?: (string | number) => any
	}>
}

type State = {
	order: 'asc' | 'desc',
	orderBy: string
}

function getSorting(order, orderBy) {
	return order === 'desc'
		? // $FlowFixMe
		  (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
		: // $FlowFixMe
		  (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1)
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
		const { classes, data, fields } = this.props
		const { order, orderBy } = this.state

		return (
			<div className={classes.root}>
				<div className={classes.tableWrapper}>
					<Table className={classes.table} aria-labelledby="Weather Data">
						<TableHead>
							<TableRow>
								{fields.map(field => (
									<TableCell
										key={field.key}
										numeric={field.numeric}
										padding="dense"
										sortDirection={orderBy === field.key ? order : false}
									>
										<TableSortLabel
											active={orderBy === field.key}
											direction={order}
											onClick={this.handleRequestSort.bind(this, field.key)}
										>
											{field.label || field.key}
										</TableSortLabel>
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{/* eslint-disable react/no-array-index-key */
								data.sort(getSorting(order, orderBy)).map((datum, datumIndex) => (
									<TableRow hover tabIndex={-1} key={`row-${datumIndex}`}>
										{fields.map((field, fieldIndex) => {
											if (!datum[field.key]) return null

											const item = datum[field.key]

											return (
												<TableCell
													key={`cell-${datumIndex}-${fieldIndex}-${item}`}
													numeric={!!field.numeric}
												>
													{!!field.formatter &&
												typeof field.formatter === 'function' &&
												!!item
														? field.formatter(item)
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
		)
	}
}

export default withStyles(styles)(WeatherDataTable)
