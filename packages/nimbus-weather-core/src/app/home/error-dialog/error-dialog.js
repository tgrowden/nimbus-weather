// @flow
import * as React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

type Props = {
	open: boolean,
	onClose: () => void,
	title?: React.Node,
	message: React.Node
}

class ErrorDialog extends React.Component<Props> {
	static defaultProps = {
		title: 'Error'
	}

	render() {
		const { open, onClose, title, message } = this.props

		return (
			<Dialog
				open={open}
				onClose={onClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{title}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						{message}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={onClose} color="secondary">
						Dismiss
					</Button>
				</DialogActions>
			</Dialog>
		)
	}
}

export default ErrorDialog
