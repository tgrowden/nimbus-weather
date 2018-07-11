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
	active: boolean
}

class TooltipContent extends React.Component<Props> {
	render() {
		const { active } = this.props

		if (!active) return null
		console.log({ props: this.props })

		const { payload, label, classes } = this.props

		return (
			<div className={classes.root}>
				<Typography className={classes.label}>{label}</Typography>
				<Typography>
					{
						!!payload[0].dataKey &&
						`${payload[0].dataKey}: `
					}
					{payload[0].value}
				</Typography>
			</div>
		)
	}
}

export default withStyles(styles)(TooltipContent)
