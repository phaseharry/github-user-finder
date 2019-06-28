import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import axios from 'axios'

import './App.css'

// components
import Nav from './components/layout/Nav'
import Users from './components/users/Users'
import Search from './components/users/Search'
import Alert from './components/layout/Alert'

//pages
import About from './components/pages/About'

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
    loading: false,
    alert: null
  }
  // componentDidMount() {
  //   this.setState({ loading: true })
  //   axios
  //     .get(
  //       `https://api.github.com/users?client_id=
  //       ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
  //       ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
  //     )
  //     .then(res => res.data)
  //     .then(users => this.setState({ users, loading: false }))
  //     .catch(err => console.error(err))
  // }
  // Search Github users
  searchUsers = async text => {
    try {
      this.setState({ loading: true })
      const res = await axios.get(
        `https://api.github.com/search/users?q=${text}&client_id=
          ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
          ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      )
      this.setState({ users: res.data.items, loading: false })
      console.log(res.data)
      /* 
        Github sends back an object with the users we want assigned as a value to the 'items' key. 
        This is for pagination purposes as there might be thousands of users due to the search.
        There is also a 'total_count' key with a value representing the total amount of users popped up due to 
        your search keyword.
      */
    } catch (err) {
      console.error(err)
      this.setState({ loading: false })
    }
  }

  // Clear users from state
  clearUsers = () => {
    this.setState({
      users: [],
      loading: false //to ensure our state is not loading
    })
  }

  // Shows the clear button when there's text entered
  showClear = () => this.state.users.length > 0

  // Set Alert when there's an issue
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } })
    setTimeout(() => this.setState({ alert: null }), 4000)
  }

  render() {
    const { loading, users, alert } = this.state
    const { searchUsers, clearUsers, showClear, setAlert } = this
    return (
      <Router>
        <div className="App">
          <Nav />
          <div className="container">
            <Alert alert={alert} />
            <Switch>
              <Route path="/about" component={About} />
              <Route
                exact
                path="/"
                render={(
                  props //props in this case is the route props (path, history, etc)
                ) => (
                  <Fragment>
                    <Search
                      searchUsers={searchUsers}
                      clearUsers={clearUsers}
                      setAlert={setAlert}
                      showClear={showClear()}
                    />
                    <Users loading={loading} users={users} />
                  </Fragment>
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

export default App
