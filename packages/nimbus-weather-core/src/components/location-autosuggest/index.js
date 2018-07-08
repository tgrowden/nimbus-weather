// @flow
import * as React from 'react'
// $FlowFixMe flow-mono error maybe?
import Downshift from 'downshift'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
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
	suggestions: Array<Object>
}

class LocationAutosuggest extends React.Component<Props, State> {
	state = {
		suggestions: []
	}

	fetchSuggestions = debounce(
		value =>
			searchLocation(value).then(suggestions => this.setState({ suggestions })),
		300
	)

	handleChange = item => {
		if (!item) return

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

		return (
			<div className={classes.root}>
				<Downshift
					onChange={this.handleChange}
					value={location}
					itemToString={i => (i && i.name ? i.name : '')}
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
								InputProps: getInputProps({
									onChange: e => {
										const { value } = e.target
										if (!value) return

										this.fetchSuggestions(value)
									},
									placeholder:
										location && location.name ? location.name : undefined
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
