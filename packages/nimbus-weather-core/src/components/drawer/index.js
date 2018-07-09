// @flow
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import classnames from 'classnames'
import MuiDrawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import CssBaseline from '@material-ui/core/CssBaseline'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Tooltip from '@material-ui/core/Tooltip'
import LinearProgress from '@material-ui/core/LinearProgress'
import { withRouter } from 'react-router-dom'
import type { Node } from 'react'
import { animateScroll as scroll } from 'react-scroll'
import { routes } from '../../routes'
import withTooltip from '../with-tooltip'
import Github from './github'
import Link from '../link'
import packageJson from '../../../package.json'

const drawerWidth = 240

type Props = {
	classes: Object,
	theme: Object,
	children: Node,
	open: boolean,
	toggleDrawer: () => void,
	location: Object,
	history: Object,
	fetchingWeather: boolean
}

const styles = (theme: MuiTheme) => ({
	root: {
		flexGrow: 1,
		zIndex: 1,
		overflow: 'hidden',
		position: 'relative',
		display: 'flex'
	},
	appBar: {
		'-webkit-app-region': 'drag',
		'-webkit-user-select': 'none',
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		})
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	menuButtonWrapper: {
		display: 'flex',
		justifyContent: 'center',
		width: theme.spacing.unit * 7,
		marginRight: theme.spacing.unit * 3,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing.unit * 9
		}
	},
	noDrag: {
		'-webkit-app-region': 'no-drag'
	},
	githubButton: {
		marginLeft: theme.spacing.unit * 4,
		marginRight: theme.spacing.unit * 2
	},
	hide: {
		display: 'none'
	},
	drawerPaper: {
		position: 'fixed',
		whiteSpace: 'nowrap',
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	drawerPaperClose: {
		overflowX: 'hidden',
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		borderRight: 'none',
		width: 0,
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing.unit * 9
		}
	},
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: '0 8px',
		...theme.mixins.toolbar
	},
	content: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.default,
		padding: theme.spacing.unit * 3,
		marginLeft: 0,
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing.unit * 9
		}
	},
	contentDrawerOpen: {
		marginLeft: drawerWidth,
		transition: theme.transitions.create('margin-left', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		})
	},
	activeListItem: {
		backgroundColor: theme.palette.action.selected,
		cursor: 'default',
		'&:hover': {
			backgroundColor: theme.palette.action.selected
		}
	},
	flexGrow: {
		flexGrow: 1
	},
	title: {
		cursor: 'pointer',
		width: 'fit-content'
	},
	mainContent: {
		maxWidth: theme.breakpoints.values.xl,
		marginLeft: 'auto',
		marginRight: 'auto',
		width: '100%'
	}
})

class Drawer extends React.Component<Props> {
	handleNavigate(path: string) {
		if (this.props.location.pathname === path) return
		this.props.history.push(path)
	}

	scrollToTop = () => {
		scroll.scrollToTop()
	}

	render() {
		const { classes, theme, children, open, fetchingWeather } = this.props

		return (
			<div className={classes.root}>
				<CssBaseline />
				<AppBar
					position="fixed"
					className={classnames(classes.appBar, open && classes.appBarShift)}
				>
					<Toolbar disableGutters={!open}>
						<div className={classes.menuButtonWrapper}>
							<IconButton
								color="inherit"
								aria-label="open drawer"
								onClick={this.props.toggleDrawer}
								className={classnames(
									classes.menuButton,
									classes.noDrag,
									open && classes.hide
								)}
							>
								<MenuIcon />
							</IconButton>
						</div>
						<div className={classes.flexGrow}>
							<Typography
								variant="title"
								color="inherit"
								noWrap
								className={classnames(classes.title, classes.noDrag)}
								onClick={this.scrollToTop}
							>
								Nimbus Weather
							</Typography>
						</div>
						<Tooltip title="Github Repo" className={classes.noDrag}>
							<Link href={packageJson.homepage} style={{ color: 'inherit' }}>
								<IconButton
									color="inherit"
									className={classnames(classes.githubButton, classes.noDrag)}
								>
									<Github />
								</IconButton>
							</Link>
						</Tooltip>
					</Toolbar>
					{
						fetchingWeather &&
						(
							<LinearProgress
								style={{
									backgroundColor: 'transparent'
								}}
								// $FlowFixMe
								color="secondary"
							/>
						)
					}
				</AppBar>
				<MuiDrawer
					variant="permanent"
					classes={{
						paper: classnames(
							classes.drawerPaper,
							!open && classes.drawerPaperClose
						)
					}}
					open={open}
				>
					<div className={classes.toolbar}>
						<IconButton onClick={this.props.toggleDrawer}>
							{theme.direction === 'rtl' ? (
								<ChevronRightIcon />
							) : (
								<ChevronLeftIcon />
							)}
						</IconButton>
					</div>
					<Divider />
					<List disablePadding>
						{routes.filter(route => !!route.icon).map(route => {
							const isActive = this.props.location.pathname === route.path
							const item = (
								<ListItem
									button
									key={`route-${route.name}`}
									onClick={this.handleNavigate.bind(this, route.path)}
									// disabled={isActive}
									className={classnames({
										[classes.activeListItem]: isActive
									})}
								>
									<ListItemIcon>{route.icon}</ListItemIcon>
									<ListItemText primary={route.name} />
								</ListItem>
							)

							return open || isActive
								? item
								: withTooltip({
									title: route.name,
									key: `route-tooltip-${route.name}`
								  })(item)
						})}
					</List>
				</MuiDrawer>
				<main
					className={classnames(classes.content, {
						[classes.contentDrawerOpen]: open
					})}
				>
					<div className={classes.toolbar} />
					<div className={classes.mainContent}>{children}</div>
				</main>
			</div>
		)
	}
}

export default withRouter(withStyles(styles, { withTheme: true })(Drawer))
