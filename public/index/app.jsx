import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { Router,hashHistory } from 'react-router'
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import { createLogger } from 'redux-logger';

import reducers from 'reducers'

const routes = require('routes')
const logger = createLogger();

let store = createStore(
    reducers,
    applyMiddleware(thunk, promiseMiddleware, logger)
);

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory} routes={routes}/>
    </Provider>
    ,document.getElementById('app'))