import React from 'react'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { PersistGate } from 'redux-persist/integration/react'
import Store from './store/configureStore'
import Routes from './routes'

const { store, persistor, history } = Store

export default () => (
	<AppContainer>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<ConnectedRouter history={history}>
					<Routes />
				</ConnectedRouter>
			</PersistGate>
		</Provider>
	</AppContainer>
)
