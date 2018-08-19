/* eslint-disable import/prefer-default-export */
export const event = (action, { category, label, value } = {}) => {
	if (!window.gtag) return

	window.gtag('event', action, {
		event_category: category,
		event_label: label,
		value
	})
}
