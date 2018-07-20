import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import MuiSnackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import type { SnackBarOrigin } from '@material-ui/core/Snackbar'
import type { Node, SyntheticEvent } from 'react'

const styles = (theme: MuiTheme) => ({
	close: {
		width: theme.spacing.unit * 4,
		height: theme.spacing.unit * 4,
		color: theme.palette.secondary.main
	}
})

type Props = {
	open: boolean,
	onClose: (event: SyntheticEvent<any>, reason: string) => void,
	message: Node,
	classes: Object,
	anchorOrigin?: SnackBarOrigin,
	closeOnClickaway?: boolean,
	autoHideDuration?: number
}

class Snackbar extends React.Component<Props> {
	static defaultProps = {
		anchorOrigin: {
			horizontal: 'center',
			vertical: 'bottom'
		},
		closeOnClickaway: false,
		autoHideDuration: 6000
	}

	handleClose = (event, reason) => {
		const { closeOnClickaway } = this.props
		if (reason === 'clickaway' && !closeOnClickaway) {
			return
		}

		this.props.onClose()
	}

	render() {
		const {
			classes,
			anchorOrigin,
			open,
			message,
			autoHideDuration,
			closeOnClickaway,
			onClose,
			...props
		} = this.props

		const handleClose = closeOnClickaway ? onClose : this.handleClose

		return (
			<MuiSnackbar
				anchorOrigin={anchorOrigin}
				open={open}
				autoHideDuration={autoHideDuration}
				onClose={handleClose}
				message={message}
				action={
					<IconButton
						key="close"
						aria-label="Close"
						color="inherit"
						className={classes.close}
						onClick={handleClose}
					>
						<CloseIcon />
					</IconButton>
				}
				{...props}
			/>
		)
	}
}

export default withStyles(styles)(Snackbar)
