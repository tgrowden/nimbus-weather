// @flow
import Location from '../../../models/location'

type Props = {
	location: Location
}

const SecondaryLabel = ({ location }: Props) => {
	const { secondaryLabel } = location

	if (typeof secondaryLabel === 'string' && secondaryLabel) {
		return secondaryLabel
	} else if (location.lat && location.lng) {
		return `${location.lat}, ${location.lng}`
	}

	return null
}

export default SecondaryLabel
