// @flow

export type locationProps = {
	lat: string | number,
	lng: string | number,
	primaryLabel: string,
	secondaryLabel?: string,
	id: string,
	cached?: boolean
}

export default class Location {
	lat: number | null

	lng: number | null

	primaryLabel: string

	secondaryLabel: string | typeof undefined

	id: string

	cached: boolean

	constructor(props: Object = {}) {
		this.lat = props.lat ? parseFloat(props.lat) : null
		this.lng = props.lng ? parseFloat(props.lng) : null
		this.primaryLabel = props.primaryLabel
		this.secondaryLabel = props.secondaryLabel
		this.id = props.id
		this.cached = props.cached || false
	}
}
