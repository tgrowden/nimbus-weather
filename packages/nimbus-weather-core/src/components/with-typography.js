import React from 'react'
import Typography from '@material-ui/core/Typography'

export default function withTypography(Component) {
	if (typeof Component === 'string') {
		return <Typography>{Component}</Typography>
	}
	return Component
}
