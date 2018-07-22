import * as React from 'react'
import TextField from '@material-ui/core/TextField'
import { apiHost } from '../../../../config'

type Props = {
	customWeatherApiHost: string,
	setCustomWeatherApiHost: (customWeatherApiHost: string) => void,
	InputLabelProps?: Object,
	label?: string,
	helperText?: React.Node,
	fullWidth?: boolean
}

class CustomWeatherApiHostInput extends React.Component<Props> {
	static defaultProps = {
		InputLabelProps: {
			shrink: true
		},
		label: 'Weather API Host',
		helperText:
			'Set this only if you want to use your own API server for weather data.',
		fullWidth: false
	}

	render() {
		const {
			customWeatherApiHost,
			setCustomWeatherApiHost,
			InputLabelProps,
			label,
			helperText,
			fullWidth,
			...props
		} = this.props

		return (
			<TextField
				fullWidth={fullWidth}
				type="url"
				placeholder={apiHost}
				label={label}
				InputLabelProps={InputLabelProps}
				helperText={helperText}
				value={customWeatherApiHost}
				onChange={e => {
					setCustomWeatherApiHost(e.target.value)
				}}
				{...props}
			/>
		)
	}
}

export default CustomWeatherApiHostInput
