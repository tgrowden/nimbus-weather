// @flow
import React from 'react'
import formatDate from '../lib/format-date'
import Field from './index'

type Props = {
	time: number,
	timezone: string,
	format?: string
}

const Time = (props: Props) => {
	const time = formatDate({
		time: props.time,
		timezone: props.timezone,
		format: props.format
	})

	return <Field value={time.toString()} label="Time" />
}

Time.defaultProps = {
	format: 'YYYY/MM/DD h:mm:ss a'
}

export default Time
