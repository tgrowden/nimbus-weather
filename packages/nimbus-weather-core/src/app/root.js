import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { PersistGate } from 'redux-persist/integration/react'
import Routes from './routes'
import FullscreenLoadingIndicator from './components/fullscreen-loading-indicator'

type Props = {
	store: {},
	history: {},
	persistor: {}
}

export default class Root extends Component<Props> {
	render() {
		return (
			<Provider store={this.props.store}>
				<PersistGate
					loading={<FullscreenLoadingIndicator />}
					persistor={this.props.persistor}
				>
					<ConnectedRouter history={this.props.history}>
						<Routes />
					</ConnectedRouter>
				</PersistGate>
			</Provider>
		)
	}
}
