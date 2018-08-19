import * as React from 'react'
import open, { getIsElectron } from '../lib/open'
import { event } from '../lib/analytics'

type AnalyticsProps = {
	disable: boolean,
	category: string,
	action: string,
	label?: string,
	value?: number
}

type Props = {
	href: string,
	children: React.ReactNode,
	analyticsProps?: AnalyticsProps
}

class Link extends React.Component<Props> {
	static defaultProps = {
		analyticsProps: {
			disable: false,
			category: 'link',
			action: 'click',
			label: undefined
		}
	}

	handleClick = e => {
		const { disable, ...analyticsProps } = this.props.analyticsProps

		if (!disable) {
			event(analyticsProps.action, {
				category: analyticsProps.category,
				label: analyticsProps.label || this.props.href,
				value: analyticsProps.value
			})
		}

		if (!getIsElectron()) return

		e.preventDefault()
		open(this.props.href)
	}

	render() {
		const { href, children, ...props } = this.props

		// Do not spread analyticsProps to a element
		delete props.analyticsProps

		return (
			<a href={href} onClick={this.handleClick} {...props}>
				{children}
			</a>
		)
	}
}

export default Link
