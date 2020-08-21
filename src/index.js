import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { HelmetProvider } from 'react-helmet-async';

import { store, persistor } from './redux-setup';

ReactDOM.render(
	// <React.StrictMode>
	<Provider store={store}>
		<PersistGate loading={<div />} persistor={persistor}>
			<HelmetProvider>
				<App />
			</HelmetProvider>
		</PersistGate>
	</Provider>
	// </React.StrictMode>
	,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
