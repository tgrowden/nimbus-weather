// @flow
import moment from 'moment-timezone'

type Props = {
	time: number,
	timezone: string,
	format?: string
}

export default function formatDate({ time, timezone, format = 'llll' }: Props) {
	const res = moment.unix(time).tz(timezone)
	return res.format(format)
}
