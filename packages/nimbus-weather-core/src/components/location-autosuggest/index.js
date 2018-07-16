// @flow
import * as React from 'react'
// $FlowFixMe flow-mono error maybe?
import Downshift from 'downshift'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import X from '@material-ui/icons/Clear'
import searchLocation from '../../lib/search-location'
import renderSuggestion from './render-suggestion'
import renderInput from './render-input'

function debounce(fn, time) {
	let timeoutId
	return wrapper
	function wrapper(...args) {
		if (timeoutId) {
			clearTimeout(timeoutId)
		}
		timeoutId = setTimeout(() => {
			timeoutId = null
			fn(...args)
		}, time)
	}
}

const styles = theme => ({
	container: {
		flexGrow: 1,
		position: 'relative',
		height: 'auto'
	},
	suggestionsContainerOpen: {
		position: 'absolute',
		zIndex: 1,
		marginTop: theme.spacing.unit,
		left: 0,
		right: 0
	},
	suggestion: {
		display: 'block'
	},
	suggestionsList: {
		margin: 0,
		padding: 0,
		listStyleType: 'none'
	}
})

type Props = {
	classes: Object,
	location: any,
	onChange: (location: any) => any
}

type State = {
	suggestions: Array<Object>,
	inputValue: string
}

class LocationAutosuggest extends React.Component<Props, State> {
	inputEl: HTMLElement

	constructor(props) {
		super(props)

		this.state = {
			suggestions: [],
			inputValue: (props.location && props.location.name) || ''
		}
	}

	fetchSuggestions = debounce(
		value =>
			searchLocation(value).then(suggestions => this.setState({ suggestions })),
		300
	)

	handleInputValueChange(inputValue) {
		this.setState({ inputValue })
	}

	handleInputValueClear() {
		this.setState({ inputValue: '' }, () => {
			this.inputEl.focus()
		})
	}

	handleChange = item => {
		if (!item) return

		this.setState({
			inputValue: item.display_name
		})

		const res = {
			name: item.display_name,
			coords: {
				lat: item.lat ? parseFloat(item.lat) : null,
				lng: item.lon ? parseFloat(item.lon) : null
			}
		}
		// $FlowFixMe
		this.props.onChange(res)
	}

	render() {
		const { classes, location } = this.props

		const { inputValue } = this.state

		return (
			<div className={classes.root}>
				<Downshift
					onChange={this.handleChange}
					value={location}
					itemToString={i => (i && i.name ? i.name : '')}
					inputValue={inputValue}
					defaultInputValue={(location && location.name) || ''}
					onInputValueChange={this.handleInputValueChange.bind(this)}
				>
					{({
						getInputProps,
						getItemProps,
						isOpen,
						selectedItem,
						highlightedIndex
					}) => (
						<div className={classes.container}>
							{renderInput({
								fullWidth: true,
								classes,
								label: 'Location',
								ref: el => {
									this.inputEl = el
								},
								InputProps: getInputProps({
									onChange: e => {
										const { value } = e.target
										if (!value) return

										this.fetchSuggestions(value)
									},
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												aria-label="Clear Location"
												onClick={this.handleInputValueClear.bind(this)}
											>
												<X />
											</IconButton>
										</InputAdornment>
									)
								})
							})}
							{isOpen && (
								<Paper className={classes.paper} square>
									{this.state.suggestions.map((suggestion, index) =>
										renderSuggestion({
											suggestion,
											index,
											itemProps: getItemProps({
												item: suggestion
											}),
											highlightedIndex,
											selectedItem
										})
									)}
								</Paper>
							)}
						</div>
					)}
				</Downshift>
			</div>
		)
	}
}

export default withStyles(styles)(LocationAutosuggest)
