import React from 'react'
import { Route, IndexRoute } from 'react-router'

const TestView = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('views/index').default);
  }, 'test');
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
        <IndexRoute getComponent={ TestView }/>
        <Route path="todo" getComponent={ Todo }/>
        <Route path="counter" getComponent={ Counter }/>
    </Route>
)

module.exports = routes