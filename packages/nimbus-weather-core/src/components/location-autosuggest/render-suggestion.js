// @flow
import React from 'react'
import MenuItem from '@material-ui/core/MenuItem'

type Props = {
	suggestion: Object,
	index: number,
	itemProps: Object,
	highlightedIndex: number | null,
	selectedItem: Object | null
}

export default function renderSuggestion({
	suggestion,
	index,
	itemProps,
	highlightedIndex
}: Props) {
	const isHighlighted = highlightedIndex === index

	return (
		<MenuItem
			{...itemProps}
			key={`${suggestion.osm_id}-${suggestion.place_id}`}
			selected={isHighlighted}
			component="p"
			style={{ whiteSpace: 'normal' }}
		>
			{suggestion.display_name}
		</MenuItem>
	)
}
