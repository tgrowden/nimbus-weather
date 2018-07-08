import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'

const styles = (theme: MuiTheme) => ({
	root: {},
	divider: {
		marginTop: theme.spacing.unit * 2,
		marginBottom: theme.spacing.unit * 2
	}
})

type Props = {
	classes: Object,
	summary?: string
}

const GeneralSummary = ({ classes, summary }: Props) => {
	if (!summary) return null

	return (
		<div className={classes.root}>
			<Typography variant="headline">{summary}</Typography>
			<Divider className={classes.divider} />
		</div>
	)
}

GeneralSummary.defaultProps = {
	summary: ''
}

export default withStyles(styles)(GeneralSummary)
