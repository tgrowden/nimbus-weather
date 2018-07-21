// @flow
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'

const styles = {
	progress: {
		backgroundColor: 'transparent'
	}
}

type Props = {
	classes: Object,
	active: boolean
}

class ProgressIndicator extends React.Component<Props> {
	render() {
		const { active, classes } = this.props
		if (!active) return null

		// $FlowFixMe
		return <LinearProgress className={classes.progress} color="secondary" />
	}
}

export default withStyles(styles)(ProgressIndicator)
