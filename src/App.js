import React, { Component } from 'react'

import './App.css'
import Nav from './components/layout/Nav'
import UserItem from './components/users/UserItem'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <UserItem />
      </div>
    )
  }
}

export default App
