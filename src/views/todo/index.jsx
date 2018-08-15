import React from 'react'
import Footer from './footer'
import AddTodo from 'views/containers/AddTodo'
import VisibleTodoList from 'views/containers/VisibleTodoList'

const App = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
)

export default App