// @flow
import * as React from 'react'
import { withStyles } from '@material-ui/core/styles'
import withWidth from '@material-ui/core/withWidth'
import MuiDownshift from 'mui-downshift'
import ListSubheader from '@material-ui/core/ListSubheader'
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
	listSubheaderRoot: {
		paddingLeft: theme.spacing.unit * 2,
		textTransform: 'uppercase'
	}
})

type Props = {
	classes: Object,
	location: OSMLocation,
	setLocation: (location: OSMLocation) => void,
	fetchWeather: () => void,
	otherSuggestions?: Array<OSMLocation>,
	width: string
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

		const suggestions =
			props.location && props.location.display_name ? [props.location] : []

		this.state = {
			suggestions
		}
	}

	fetchSuggestions = debounce(
		value =>
			searchLocation(value).then(suggestions => this.setState({ suggestions })),
		300
	)

	handleChange = item => {
		if (!item) return

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
		placeholder: this.props.location.display_name
	})

	render() {
		const { classes, location } = this.props

		const existingSuggestions = (this.props.otherSuggestions || []).map(
			i => i && i.display_name
		)

		let items = this.state.suggestions.filter(
			i =>
				i &&
				i.display_name &&
				existingSuggestions.indexOf(i.display_name) === -1
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
				itemToString={i => (i && i.display_name) || ''}
				value={location}
				defaultInputValue={location.display_name}
				onChange={this.handleChange}
				getListItem={renderSuggestion}
				getInputProps={this.getInputProps}
				selectedItem={location && location.display_name ? location : undefined}
				focusOnClear
			/>
		)
	}
}

export default withWidth()(withStyles(styles)(LocationAutosuggest))
