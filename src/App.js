import React, { Component } from 'react'
import axios from 'axios'

import './App.css'
import Nav from './components/layout/Nav'
import Users from './components/users/Users'

class App extends Component {
  /* 
    constructor runs when the component runs (as soon as it loads) 
    It is used to store state and bind methods to the component.
    However in modern React/JS, we don't need a constructor method 
    as arrow functions will automatically get the "this" context of 
    the component lexically rather than on its execution context.
    State can also just be a key in the component as well

    ex) Old school 
    constructor(props) {
    super(props)
    this.state = {
      id: 'id',
      login: 'mojombom',
      avatar_url: 'https://avatars0.githubusercontent.com/u/1?v=4',
      html_url: 'https://github.com/mojombo'
    }
  }
  */
  /*
    Modern React/JS
    needs to be specifically configured in Babel at the moment
  */
  state = {
    users: [],
    loading: false
  }
  componentDidMount() {
    this.setState({ loading: true })
    axios
      .get('https://api.github.com/users')
      .then(res => res.data)
      .then(users => this.setState({ users, loading: false }))
      .catch(err => console.error(err))
  }

  render() {
    const { loading, users } = this.state
    return (
      <div className="App">
        <Nav />
        <div className="container">
          <Users loading={loading} users={users} />
        </div>
      </div>
    )
  }
}

export default App
