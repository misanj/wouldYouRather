import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import 'bootstrap/dist/css/bootstrap.css';
import reducers from './Reducers';
import middleware from './Middleware';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const store = createStore(reducers, middleware)
ReactDOM.render(
  <Provider store={store}>
    <App />
    </Provider>,
  document.getElementById('root')
);
