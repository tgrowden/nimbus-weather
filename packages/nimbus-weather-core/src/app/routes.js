/* eslint flowtype-errors/show-errors: 0 */
import React from 'react'
import { Switch, Route } from 'react-router'
import HomeIcon from '@material-ui/icons/Cloud'
import SettingsIcon from '@material-ui/icons/Settings'
import Drawer from './drawer'
import Home from './home'
import Settings from './settings'
import ThemeProvider from './theme-provider'

export const routes = [
	{
		name: 'Weather',
		path: '/',
		component: Home,
		icon: <HomeIcon />
	},
	{
		name: 'Settings',
		path: '/settings',
		component: Settings,
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
