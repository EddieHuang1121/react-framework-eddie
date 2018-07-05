import React from 'react'
import { Route, IndexRoute } from 'react-router'

const IndexView  = (location, cb) => {
    require.ensure([], require => {
      cb(null, require('../views/containers/index/index').default);
    }, 'index');
  };

const routes =  (
	<Route path="/">
        <IndexRoute getComponent={ IndexView }/>
    </Route>
)

module.exports = routes