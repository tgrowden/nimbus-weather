// @flow
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import InputAdornment from '@material-ui/core/InputAdornment'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as WeatherVisualizationActions from '../../actions/weather-visualizations'

const styles = {
	root: {},
	switchLabelWrapper: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	}
}

type Props = {
	classes: Object,
	preferredUnits: Unit,
	hotTemp: number,
	setHotTemp: (hotTemp: number) => void,
	coldTemp: number,
	setColdTemp: (coldTemp: number) => void
}

class WeatherVisualizationSettings extends React.Component<Props> {
	get units() {
		return this.props.preferredUnits === 'us' ? '°F' : '°C'
	}

	handleTempChange(type, e) {
		let { value } = e.target

		if (!value) return

		value = parseInt(value, 10)

		if (type === 'hot') {
			this.props.setHotTemp(value)
		} else if (type === 'cold') {
			this.props.setColdTemp(value)
		}
	}

	render() {
		const { classes, hotTemp, coldTemp } = this.props
		/* eslint-disable react/jsx-no-duplicate-props */
		return (
			<div className={classes.root}>
				<ExpansionPanel defaultExpanded>
					<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
						<Typography variant="subheading">
							Weather Visualization Settings
						</Typography>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails>
						<Grid container spacing={16}>
							<Grid item xs={12}>
								<TextField
									type="number"
									value={hotTemp}
									InputProps={{
										endAdornment: <InputAdornment position="end">{this.units}</InputAdornment>
									}}
									inputProps={{
										pattern: '\\d+',
										step: 1
									}}
									onChange={this.handleTempChange.bind(this, 'hot')}
								/>
							</Grid>
						</Grid>
					</ExpansionPanelDetails>
				</ExpansionPanel>
			</div>
		)
		/* eslint-enable react/jsx-no-duplicate-props */
	}
}

function mapStateToProps(state) {
	return {
		hotTemp: state.weatherVisualizations.hotTemp,
		coldTemp: state.weatherVisualizations.coldTemp,
		preferredUnits: state.weatherVisualizations.preferredUnits
	}
}

function mapDispatchToProps(dispatch: *) {
	return bindActionCreators(WeatherVisualizationActions, dispatch)
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(WeatherVisualizationSettings))
