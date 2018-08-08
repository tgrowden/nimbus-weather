// @flow
import * as React from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import Star from '@material-ui/icons/Star'
import StarBorder from '@material-ui/icons/StarBorder'
import IconButton from '@material-ui/core/IconButton'
import ListItemText from '@material-ui/core/ListItemText'
import {
	removeFavoriteLocation,
	addFavoriteLocation
} from '../lib/favorite-locations'
import Location from '../../../models/location'
import SecondaryLabel from './secondary-label'

type Props = {
	item: Location,
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

export default function Suggestion({
	item,
	index,
	getItemProps,
	downshiftProps
}: Props) {
	const itemProps = getItemProps()

	const isHighlighted = downshiftProps.highlightedIndex === index

	/* eslint-disable-next-line no-prototype-builtins */
	if (item.hasOwnProperty('$$typeof')) {
		return item
	}

	return (
		<MenuItem
			{...itemProps}
			key={`location-item-${item.id}-${item.cached ? 'true' : 'false'}`}
			selected={isHighlighted}
			component="div"
			style={{ whiteSpace: 'normal', height: 'auto' }}
		>
			<ListItemText
				primary={item.primaryLabel}
				secondary={<SecondaryLabel location={item} />}
			/>
			{item.primaryLabel !== 'Current Location' && (
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
