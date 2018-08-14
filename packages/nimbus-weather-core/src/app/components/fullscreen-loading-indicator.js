import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = {
	root: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},
	progress: {
		outline: 'none'
	}
}

type Props = {
	classes: Object
}

const FullscreenLoadingIndicator = ({ classes }: Props) => (
	<Modal className={classes.root} open disableRestoreFocus disableAutoFocus>
		<CircularProgress size={50} className={classes.progress} />
	</Modal>
)

export default withStyles(styles)(FullscreenLoadingIndicator)
