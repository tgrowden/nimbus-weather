// @flow
import * as React from 'react'
import { withStyles } from '@material-ui/core/styles'
import withWidth from '@material-ui/core/withWidth'
import MuiDownshift from 'mui-downshift'
import ListSubheader from '@material-ui/core/ListSubheader'
import { compose } from 'recompose'
import searchLocation from '../../lib/search-location'
import Suggestion from './suggestion'
import Location from '../../models/location'

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
	listSubheaderRoot: {
		paddingLeft: theme.spacing.unit * 2,
		textTransform: 'uppercase'
	}
})

type Props = {
	classes: Object,
	location: Location,
	setLocation: (location: Location) => void,
	fetchWeather: () => void,
	otherSuggestions?: Array<Location>,
	width: string
}

type State = {
	suggestions: Array<Location>
}

class LocationAutosuggest extends React.Component<Props, State> {
	inputEl: HTMLElement

	static defaultProps = {
		otherSuggestions: []
	}

	constructor(props) {
		super(props)

		const suggestions =
			props.location && props.location.display_name ? [props.location] : []

		this.state = {
			suggestions
		}
	}

	fetchSuggestions = debounce(
		value =>
			searchLocation(value)
				.then(
					// $FlowFixMe
					(suggestions: Array<OSMLocation>): Array<Location> =>
						suggestions.map(
							(suggestion: OSMLocation): Location =>
								new Location({
									lat: suggestion.lat,
									lng: suggestion.lon,
									primaryLabel: suggestion.display_name,
									id: suggestion.osm_id
								})
						)
				)
				.then((suggestions: Array<Location>) => this.setState({ suggestions })),
		300
	)

	handleChange = item => {
		if (!item || item === this.props.location) return

		// $FlowFixMe
		this.props.setLocation(item)
		this.props.fetchWeather()
		if (this.inputEl) {
			this.inputEl.blur()
		}
	}

	handleStateChange = changes => {
		if (
			typeof changes.inputValue === 'string' &&
			changes.inputValue !== 'Current Location'
		) {
			if (changes.inputValue === '') {
				this.setState({
					suggestions: [this.props.location]
				})
			} else {
				this.fetchSuggestions(changes.inputValue)
			}
		}
	}

	getInputProps = () => ({
		multiline: this.props.width === 'xs',
		fullWidth: true,
		label: 'Location',
		placeholder: this.props.location.primaryLabel,
		helperText: this.props.location.secondaryLabel
	})

	render() {
		const { classes, location } = this.props

		const existingSuggestions = (this.props.otherSuggestions || []).map(
			i => i && i.primaryLabel
		)

		let items = this.state.suggestions.filter(
			i =>
				i &&
				i.primaryLabel &&
				existingSuggestions.indexOf(i.primaryLabel) === -1
		)

		if (this.props.otherSuggestions && this.props.otherSuggestions.length > 0) {
			items = [
				...items,
				<ListSubheader
					classes={{
						root: classes.listSubheaderRoot
					}}
					component="div"
				>
					Favorites
				</ListSubheader>,
				...this.props.otherSuggestions
			]
		}

		return (
			<MuiDownshift
				items={items}
				onStateChange={this.handleStateChange}
				itemToString={i => (i && i.primaryLabel) || ''}
				value={location}
				defaultInputValue={location.primaryLabel}
				onChange={this.handleChange}
				getListItem={Suggestion}
				getInputProps={this.getInputProps}
				selectedItem={location && location.primaryLabel ? location : undefined}
				focusOnClear
				inputRef={node => {
					this.inputEl = node
				}}
			/>
		)
	}
}

export default compose(
	withWidth(),
	withStyles(styles)
)(LocationAutosuggest)
