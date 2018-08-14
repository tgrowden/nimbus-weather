import router from './router'
import persistor from './persistor'
import home from './home'
import settings from './settings'
import drawer from './drawer'
import theme from './theme'
import weatherVisualizations from './weather-visualizations'

export default {
	...router,
	...persistor,
	...home,
	...settings,
	...drawer,
	...theme,
	...weatherVisualizations
}
