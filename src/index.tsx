import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HelmetProvider } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux';
import store from './store';
import { initApiService } from './services';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

const start = () => {
	initApiService();
	root.render(
		// <React.StrictMode>
		<HelmetProvider>
			<ReduxProvider store={store}>
				<App />
			</ReduxProvider>
		</HelmetProvider>
		// </React.StrictMode>
	);
}

start();
reportWebVitals();
