// @flow
import * as React from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import Star from '@material-ui/icons/Star'
import StarBorder from '@material-ui/icons/StarBorder'
import IconButton from '@material-ui/core/IconButton'
import ListItemText from '@material-ui/core/ListItemText'
import { removeFavoriteLocation, addFavoriteLocation } from './lib/favorite-locations'

type Props = {
	item: OSMLocation,
	index: number,
	getItemProps: () => Object,
	downshiftProps: {
		clearItems: () => void,
		clearSelection: (cb: (...any) => any) => void,
		closeMenu: (cb: (...any) => any) => void,
		isOpen: boolean,
		id: string,
		highlightedIndex: number | null,
		selectedItem: Object | null
	}
}

export default function renderSuggestion({
	item,
	index,
	getItemProps,
	downshiftProps
}: Props) {
	const itemProps = getItemProps()

	const isHighlighted = downshiftProps.highlightedIndex === index

	return (
		<MenuItem
			{...itemProps}
			key={`location-item-${item.osm_id}-${item.cached}`}
			selected={isHighlighted}
			component="div"
			style={{ whiteSpace: 'normal', height: 'auto' }}
		>
			<ListItemText primary={item.display_name} />
			{item.display_name !== 'Current Location' && (
				<React.Fragment>
					{item.cached ? (
						<IconButton onClick={removeFavoriteLocation(item)}>
							<Star />
						</IconButton>
					) : (
						<IconButton onClick={addFavoriteLocation(item)}>
							<StarBorder />
						</IconButton>
					)}
				</React.Fragment>
			)}
		</MenuItem>
	)
}
