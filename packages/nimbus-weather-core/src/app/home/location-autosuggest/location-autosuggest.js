// @flow
import * as React from 'react'
import { withStyles } from '@material-ui/core/styles'
import withWidth from '@material-ui/core/withWidth'
import MuiDownshift from 'mui-downshift'
import searchLocation from '../../lib/search-location'
import renderSuggestion from './render-suggestion'

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
	location: OSMLocation,
	setLocation: (location: OSMLocation) => void,
	fetchWeather: () => void,
	otherSuggestions?: Array<OSMLocation>,
	inputValue: string,
	setInputValue: (inputValue: string) => void,
	width: string,
	addFavoriteLocation: (location: OSMLocation) => void,
	removeFavoriteLocation: (location: OSMLocation) => void
}

type State = {
	suggestions: Array<OSMLocation>
}

class LocationAutosuggest extends React.Component<Props, State> {
	inputEl: HTMLElement

	static defaultProps = {
		otherSuggestions: []
	}

	constructor(props) {
		super(props)

		this.state = {
			suggestions: []
		}
	}

	fetchSuggestions = debounce(
		value =>
			searchLocation(value).then(suggestions => this.setState({ suggestions })),
		300
	)

	handleInputValueChange(inputValue) {
		this.props.setInputValue(inputValue)
	}

	handleChange = item => {
		if (!item) return

		this.props.setInputValue(item.display_name)

		const res = {
			...item,
			name: item.display_name,
			coords: {
				lat: item.lat ? parseFloat(item.lat) : null,
				lng: item.lon ? parseFloat(item.lon) : null
			}
		}
		// $FlowFixMe
		this.props.setLocation(res)
		this.props.fetchWeather()
	}

	addFavoriteLocation = (location, e) => {
		e.preventDefault()
		e.stopPropagation()
		this.props.addFavoriteLocation(location)
	}

	removeFavoriteLocation = (location, e) => {
		e.preventDefault()
		e.stopPropagation()
		this.props.removeFavoriteLocation(location)
	}

	handleStateChange = changes => {
		if (typeof changes.inputValue === 'string' && changes.inputValue !== 'Current Location') {
			if (changes.inputValue === '') {
				this.setState({
					suggestions: [
						this.props.location
					]
				})
			} else {
				this.fetchSuggestions(changes.inputValue)
			}
		}
	}

	getInputProps = () => ({
		fullWidth: true,
		label: 'Location',
		placeholder: this.props.location.name
	})

	render() {
		const { classes, inputValue, width, location } = this.props

		const existingSuggestions = this.props.otherSuggestions.map(i => i.name || i.display_name || i.label)

		const items = [
			...this.props.otherSuggestions,
			...this.state.suggestions
				.filter(i => (i && i.display_name && existingSuggestions.indexOf(i.display_name) === -1))
		]

		return (
			<MuiDownshift
				items={items}
				onStateChange={this.handleStateChange}
				itemToString={i => (i && i.display_name || '')}
				value={location}
				defaultInputValue={location.name}
				onChange={this.handleChange}
				getListItem={renderSuggestion}
				getInputProps={this.getInputProps}
				selectedItem={location && location.name ? location : undefined}
				focusOnClear
			/>
		)
	}
}

export default withWidth()(withStyles(styles)(LocationAutosuggest))
