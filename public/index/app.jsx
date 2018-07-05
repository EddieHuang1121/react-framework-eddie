import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'

import { Router,hashHistory } from 'react-router'

const routes = require('routes')

ReactDOM.render(<Router history={hashHistory} routes={routes}/> ,document.getElementById('app'))