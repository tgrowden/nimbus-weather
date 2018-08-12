import { createMiddleware } from 'redux-beacon'
import GoogleAnalyticsGtag from '@redux-beacon/google-analytics-gtag'
import eventsMap from './events-map'
import { gaTrackingId } from '../../../../config'

const ga = GoogleAnalyticsGtag(gaTrackingId)

export default createMiddleware(eventsMap, ga)
