// @flow
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
	ExpansionPanel,
	ExpansionPanelSummary,
	ExpansionPanelDetails,
	Typography,
	Grid,
	FormControlLabel,
	Switch,
	Select,
	MenuItem,
	InputLabel,
	FormControl
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as ThemeActions from '../../actions/theme'
import { colorOptions } from '../../utils/colors'

const styles = (theme: MuiTheme) => ({
	root: {},
	heading: {
		color: theme.palette.secondary.main
	},
	switchLabelWrapper: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	}
})

type Props = {
	classes: Object,
	themePaletteType: MuiThemePaletteType,
	setThemeType: (themePaletteType: MuiThemePaletteType) => void,
	primaryColor: string,
	setPrimaryColor: (primaryColor: string) => void,
	secondaryColor: string,
	setSecondaryColor: (secondaryColor: string) => void,
	errorColor: string,
	setErrorColor: (errorColor: string) => void
}

class ThemeSettings extends React.Component<Props> {
	handleThemePaletteChange = (e, checked) => {
		const { setThemeType } = this.props
		const nextType = checked ? 'dark' : 'light'

		setThemeType(nextType)
	}

	render() {
		const {
			classes,
			themePaletteType,
			primaryColor,
			secondaryColor,
			errorColor
		} = this.props
		return (
			<div className={classes.root}>
				<ExpansionPanel defaultExpanded>
					<ExpansionPanelSummary
						expandIcon={<ExpandMoreIcon color="secondary" />}
					>
						<Typography className={classes.heading} variant="subheading">
							Theme Settings
						</Typography>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails>
						<Grid container spacing={16}>
							<Grid item xs={12}>
								<FormControlLabel
									control={
										<Switch
											checked={themePaletteType === 'dark'}
											onChange={this.handleThemePaletteChange}
										/>
									}
									label="Use Dark Theme"
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<FormControl fullWidth>
									<InputLabel>Primary Color</InputLabel>
									<Select
										value={primaryColor}
										onChange={e => {
											this.props.setPrimaryColor(e.target.value)
										}}
									>
										{colorOptions.map(opt => (
											<MenuItem value={opt.value} key={`primary-${opt.value}`}>
												{opt.label}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</Grid>
							<Grid item xs={12} sm={6}>
								<FormControl fullWidth>
									<InputLabel>Secondary Color</InputLabel>
									<Select
										value={secondaryColor}
										onChange={e => {
											this.props.setSecondaryColor(e.target.value)
										}}
									>
										{colorOptions.map(opt => (
											<MenuItem
												value={opt.value}
												key={`secondary-${opt.value}`}
											>
												{opt.label}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</Grid>
							<Grid item xs={12} sm={6}>
								<FormControl fullWidth>
									<InputLabel>Error Color</InputLabel>
									<Select
										value={errorColor}
										onChange={e => {
											this.props.setErrorColor(e.target.value)
										}}
									>
										{colorOptions.map(opt => (
											<MenuItem value={opt.value} key={`error-${opt.value}`}>
												{opt.label}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</Grid>
						</Grid>
					</ExpansionPanelDetails>
				</ExpansionPanel>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		themePaletteType: state.theme.themePaletteType,
		primaryColor: state.theme.primaryColor,
		secondaryColor: state.theme.secondaryColor,
		errorColor: state.theme.errorColor
	}
}

function mapDispatchToProps(dispatch: *) {
	return bindActionCreators(ThemeActions, dispatch)
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(ThemeSettings))
