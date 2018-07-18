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
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as WeatherVisualizationActions from '../../actions/weather-visualizations'
import { colorOptions } from '../../utils/colors'
import { fahrenheitToCelsius, celsiusToFahrenheit } from '../../lib/convert-temperature'

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
	setColdTemp: (coldTemp: number) => void,
	coldTempColor: string,
	setColdTempColor: (coldTempColor: string) => void,
	hotTempColor: string,
	setHotTempColor: (hotTempColor: string) => void
}

class WeatherVisualizationSettings extends React.Component<Props> {
	get units() {
		return this.props.preferredUnits === 'us' ? '°F' : '°C'
	}

	handleTempChange(type, e) {
		const { preferredUnits } = this.props
		let { value } = e.target

		if (!value) return

		value = parseInt(value, 10)

		if (preferredUnits === 'us') {
			value = parseInt(value, 10)
		} else {
			value = celsiusToFahrenheit(parseInt(value, 10))
		}

		if (type === 'hot') {
			this.props.setHotTemp(value)
		} else if (type === 'cold') {
			this.props.setColdTemp(value)
		}
	}

	get hotTemp() {
		const { preferredUnits, hotTemp } = this.props
		if (preferredUnits === 'us') return hotTemp

		return fahrenheitToCelsius(hotTemp)
	}

	get coldTemp() {
		const { preferredUnits, coldTemp } = this.props
		if (preferredUnits === 'us') return coldTemp

		return fahrenheitToCelsius(coldTemp)
	}

	render() {
		const { classes, hotTempColor, coldTempColor } = this.props
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
							<Grid item xs={12} sm={6}>
								<FormControl fullWidth>
									<InputLabel>Hot Temperature Color</InputLabel>
									<Select
										value={hotTempColor}
										onChange={e => {
											this.props.setHotTempColor(e.target.value)
										}}
									>
										{colorOptions.map(opt => (
											<MenuItem value={opt.value} key={`hotTemp-${opt.value}`}>
												{opt.label}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</Grid>
							<Grid item xs={12} sm={6}>
								<FormControl fullWidth>
									<InputLabel>Cold Temperature Color</InputLabel>
									<Select
										value={coldTempColor}
										onChange={e => {
											this.props.setColdTempColor(e.target.value)
										}}
									>
										{colorOptions.map(opt => (
											<MenuItem
												value={opt.value}
												key={`coldTemp-${opt.value}`}
											>
												{opt.label}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									label="Hot Temperature"
									type="number"
									value={this.hotTemp}
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
							<Grid item xs={12} sm={6}>
								<TextField
									label="Cold Temperature"
									type="number"
									value={this.coldTemp}
									InputProps={{
										endAdornment: <InputAdornment position="end">{this.units}</InputAdornment>
									}}
									inputProps={{
										pattern: '\\d+',
										step: 1
									}}
									onChange={this.handleTempChange.bind(this, 'cold')}
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
		preferredUnits: state.weatherVisualizations.preferredUnits,
		hotTempColor: state.weatherVisualizations.hotTempColor,
		coldTempColor: state.weatherVisualizations.coldTempColor
	}
}

function mapDispatchToProps(dispatch: *) {
	return bindActionCreators(WeatherVisualizationActions, dispatch)
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(WeatherVisualizationSettings))
