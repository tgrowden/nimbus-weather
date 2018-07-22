import * as React from 'react'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

const styles = (theme: MuiTheme) => ({
	root: {
		padding: theme.spacing.unit
	},
	label: {
		marginBottom: theme.spacing.unit
	}
})

type Props = {
	active: boolean,
	payload: Array<Object>,
	label: string,
	classes: Object
}

class TooltipContent extends React.Component<Props> {
	render() {
		const { active, payload } = this.props

		if (!active || payload.length < 1) return null

		const { label, classes } = this.props

		return (
			<div className={classes.root}>
				<Typography className={classes.label} variant="body2">
					{label}
				</Typography>
				{payload.map((item, i) => (
					/* eslint-disable react/no-array-index-key */
					<Typography
						key={`payload-item-${item.name}-${item.value}-${i}`}
						style={{
							color: item.color || 'inherit'
						}}
					>
						{!!item.name && `${item.name}: `}
						{item.value}
						{!!item.unit && item.unit}
					</Typography>
					/* eslint-enable react/no-array-index-key */
				))}
			</div>
		)
	}
}

export default withStyles(styles)(TooltipContent)
