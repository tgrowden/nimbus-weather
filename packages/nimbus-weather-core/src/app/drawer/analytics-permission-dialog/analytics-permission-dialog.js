// @flow
import * as React from 'react'
import withMobileDialog from '@material-ui/core/withMobileDialog'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

type Props = {
	allowAnalytics: boolean | null,
	setAllowAnalytics: (allowAnalytics: boolean) => void,
	fullScreen: boolean
}

class AnalyticsPermissionDialog extends React.Component<Props> {
	render() {
		const { fullScreen } = this.props

		return (
			<Dialog
				fullScreen={fullScreen}
				open={this.props.allowAnalytics === null}
				onRendered={this.handleRender}
			>
				<DialogTitle>Allow Analytics?</DialogTitle>
				<DialogContent>
					<DialogContentText>
						We use Google Analytics to track certain user behavior to allow for
						a better experience. We NEVER sell your data. Is this something
						you&#39;ll allow? You can always change your mind and update the
						settings.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						color="secondary"
						onClick={this.props.setAllowAnalytics.bind(null, true)}
					>
						Sure
					</Button>
					<Button
						color="secondary"
						onClick={this.props.setAllowAnalytics.bind(null, false)}
					>
						Nope
					</Button>
				</DialogActions>
			</Dialog>
		)
	}
}

export default withMobileDialog()(AnalyticsPermissionDialog)
