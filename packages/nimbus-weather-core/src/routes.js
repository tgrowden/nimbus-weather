/* eslint flowtype-errors/show-errors: 0 */
import React from 'react'
import { Switch, Route } from 'react-router'
import HomeIcon from '@material-ui/icons/Cloud'
import SettingsIcon from '@material-ui/icons/Settings'
import Drawer from './containers/drawer'
import HomePage from './containers/home-page'
import SettingsPage from './containers/settings-page'
import ThemeProvider from './containers/theme-provider'

export const routes = [
	{
		name: 'Weather',
		path: '/',
		component: HomePage,
		icon: <HomeIcon />
	},
	{
		name: 'Settings',
		path: '/settings',
		component: SettingsPage,
		icon: <SettingsIcon />
	}
]

// const defaultRoute = routes.find(route => route.name === 'Home')

export default () => (
	<ThemeProvider>
		<Drawer>
			<Switch>
				{routes.map(route => (
					<Route
						exact
						key={`route-${route.name}`}
						path={route.path}
						component={route.component}
					/>
				))}
			</Switch>
		</Drawer>
	</ThemeProvider>
)
