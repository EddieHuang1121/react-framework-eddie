import React from 'react'
import { Route, IndexRoute } from 'react-router'

const IndexView = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('views/index').default);
  }, 'index');
};

const Todo = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('views/todo').default);
  }, 'todo');
};

const Counter = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('views/counter/containers').default);
  }, 'counter');
};

const routes =  (
	<Route path="/">
        <IndexRoute getComponent={ IndexView }/>
        <Route path="todo" getComponent={ Todo }/>
        <Route path="counter" getComponent={ Counter }/>
    </Route>
)

module.exports = routes