import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import App from './react/containers/app.js';

import { Provider } from 'react-redux';
import Store from './redux/store.js';

ReactDOM.render(
  <Provider store={Store}>
    {
      <App />
    }
  </Provider>,
  document.getElementById('app')
);
