// @flow
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
	ExpansionPanel,
	ExpansionPanelSummary,
	ExpansionPanelDetails,
	Typography,
	Grid,
	Button,
	FormControlLabel,
	Switch
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Store from '../../../store/configureStore'
import Snackbar from '../../components/snackbar'
import HelpPopover from '../../components/help-popover'

const { persistor } = Store

const styles = (theme: MuiTheme) => ({
	root: {},
	heading: {
		color: theme.palette.error.main
	},
	switchLabelWrapper: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	}
})

type Props = {
	classes: Object,
	renderIcons: boolean,
	setRenderIcons: (renderIcons: boolean) => void
}

type State = {
	showTodoMessage: boolean
}

class AdvancedSettings extends React.Component<Props, State> {
	state = {
		showTodoMessage: false
	}

	clearSettings = () => {
		persistor
			.purge()
			.then(() => window.location.reload())
			.catch(() => {
				// do nothing
			})
	}

	toggleTodoMessage(showTodoMessage) {
		this.setState({
			showTodoMessage
		})
	}

	showTodo = () => {
		this.toggleTodoMessage(true)
	}

	onRenderIconsChange = (e, renderIcons: boolean) => {
		this.props.setRenderIcons(renderIcons)
	}

	render() {
		const { classes } = this.props
		return (
			<div className={classes.root}>
				<ExpansionPanel>
					<ExpansionPanelSummary expandIcon={<ExpandMoreIcon color="error" />}>
						<Typography className={classes.heading} variant="subheading">
							Advanced Settings
						</Typography>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails>
						<Grid container spacing={16}>
							<Grid item xs={12} sm={6}>
								<Button
									color="secondary"
									variant="raised"
									onClick={this.clearSettings}
								>
									Clear All Data
								</Button>
							</Grid>
							<Grid item xs={12} sm={6}>
								<FormControlLabel
									control={
										<Switch
											checked={this.props.renderIcons}
											onChange={this.onRenderIconsChange}
										/>
									}
									label={
										<div className={classes.switchLabelWrapper}>
											<Typography style={{ marginRight: 10 }}>
												Render Icons?
											</Typography>
											<HelpPopover size="sm">
												The weather icons in the app use an HTML5 canvas for
												animations. Rendering a lot at once can cause
												performance hits.
											</HelpPopover>
										</div>
									}
								/>
							</Grid>
						</Grid>
					</ExpansionPanelDetails>
				</ExpansionPanel>
				<Snackbar
					onClose={this.toggleTodoMessage.bind(this, false)}
					open={this.state.showTodoMessage}
					message="This has not been implemented yet"
					closeOnClickaway
				/>
			</div>
		)
	}
}

export default withStyles(styles)(AdvancedSettings)
