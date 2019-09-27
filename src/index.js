import React from 'react';
import * as Sentry from '@sentry/browser';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import history from './utils/history';
import 'antd/dist/antd.css';

import App from './Container/App';
// import * as serviceWorker from './serviceWorker';

import configureStore from './Redux/configureStore';

Sentry.init({
  dsn: 'https://cee9bfaa024147f4b70809f4187cc5ec@sentry.io/1763253'
});

const { store, persistor } = configureStore();
// const { store } = configureStore();

ReactDOM.render(
  <Router history={history}>
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>
        <App />
      </Provider>
    </PersistGate>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
