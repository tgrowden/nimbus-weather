import * as React from 'react'
import open, { isElectron } from '../lib/open'

type Props = {
	href: string,
	children: React.ReactNode
}

class Link extends React.Component<Props> {
	handleClick = (e) => {
		if (!isElectron) return

		e.preventDefault()
		open(this.props.href)
	}

	render() {
		const { href, children, ...props } = this.props

		return (
			<a
				href={href}
				onClick={this.handleClick}
				{...props}
			>
				{children}
			</a>
		)
	}
}

export default Link
