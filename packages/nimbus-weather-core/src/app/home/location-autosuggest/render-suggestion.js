// @flow
import * as React from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import Star from '@material-ui/icons/Star'
import StarBorder from '@material-ui/icons/StarBorder'
import IconButton from '@material-ui/core/IconButton'
import ListItemText from '@material-ui/core/ListItemText'

type Props = {
	suggestion: OSMLocation,
	index: number,
	itemProps: Object,
	highlightedIndex: number | null,
	selectedItem: Object | null,
	addFavoriteLocation: (e: SyntheticEvent) => void,
	removeFavoriteLocation: (e: SyntheticEvent) => void
}

export default function renderSuggestion({
	suggestion,
	index,
	itemProps,
	highlightedIndex,
	addFavoriteLocation,
	removeFavoriteLocation
}: Props) {
	const isHighlighted = highlightedIndex === index

	return (
		<MenuItem
			{...itemProps}
			key={`location-suggestion-${suggestion.osm_id}-${suggestion.cached}`}
			selected={isHighlighted}
			component="div"
			style={{ whiteSpace: 'normal', height: 'auto' }}
		>
			<ListItemText primary={suggestion.display_name} />
			{suggestion.display_name !== 'Current Location' && (
				<React.Fragment>
					{suggestion.cached ? (
						<IconButton onClick={removeFavoriteLocation}>
							<Star />
						</IconButton>
					) : (
						<IconButton onClick={addFavoriteLocation}>
							<StarBorder />
						</IconButton>
					)}
				</React.Fragment>
			)}
		</MenuItem>
	)
}
