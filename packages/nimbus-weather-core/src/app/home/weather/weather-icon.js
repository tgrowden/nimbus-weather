// @flow
import React from 'react'
import Skycons from 'react-skycons'
import { connect } from 'react-redux'
import { withTheme } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'

type Props = {
	icon: IconTypes,
	style?: Object,
	animateIcons: boolean,
	theme: MuiTheme
}

const iconEnum = [
	'CLEAR_DAY',
	'CLEAR_NIGHT',
	'PARTLY_CLOUDY_DAY',
	'PARTLY_CLOUDY_NIGHT',
	'CLOUDY',
	'RAIN',
	'SLEET',
	'SNOW',
	'WIND',
	'FOG'
]

function getIconLabel(iconName?: string): string {
	if (!iconName) return ''

	return iconName
		.replace(/-/g, ' ')
		.replace(/(\b[a-z](?!\s))/g, l => l.toUpperCase())
}

class WeatherIcon extends React.Component<Props> {
	static defaultProps = {
		style: {
			width: 150,
			height: 'auto'
		}
	}

	render() {
		if (!this.props.icon) return null
		const iconType = this.props.icon.toUpperCase().replace(/-/g, '_')
		if (iconEnum.indexOf(iconType) === -1) return null
		const iconLabel = getIconLabel(this.props.icon)

		const { style, theme, animateIcons } = this.props

		return (
			<div style={style}>
				<Tooltip title={iconLabel} placement="top">
					<Skycons
						color={theme.palette.type === 'dark' ? 'white' : 'black'}
						icon={iconType}
						autoplay={animateIcons}
						style={{ width: '100%', height: 'auto' }}
					/>
				</Tooltip>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		animateIcons: state.settings.animateIcons
	}
}

export default connect(mapStateToProps)(withTheme()(WeatherIcon))
