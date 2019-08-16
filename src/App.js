import React, { useState, Fragment } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import axios from 'axios'

import './App.css'

// layout components
import Nav from './components/layout/Nav'
import Alert from './components/layout/Alert'

// user components
import Users from './components/users/Users'
import User from './components/users/User'
import Search from './components/users/Search'

//pages
import About from './components/pages/About'

const App = () => {
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
    state = {
      users: [],
      user: {},
      repos: [],
      loading: false,
      alert: null
    }
  */
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
  const [users, setUsers] = useState([])
  const [user, setUser] = useState({})
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState(null) 
  // Search Github users
  const searchUsers = async text => {
    try {
      setLoading(true)
      const res = await axios.get(
        `https://api.github.com/search/users?q=${text}&client_id=
          ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
          ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      )
      setLoading(false)
      setUsers(res.data.items)
      console.log(res.data)
      /* 
        Github sends back an object with the users we want assigned as a value to the 'items' key. 
        This is for pagination purposes as there might be thousands of users due to the search.
        There is also a 'total_count' key with a value representing the total amount of users popped up due to 
        your search keyword.
      */
    } catch (err) {
      console.error(err)
      setLoading(false)
    }
  }

  // Clear users from state
  const clearUsers = () => {
    setUsers([])
    setLoading(false)
  }

  // Shows the clear button when there's text entered
  const showClear = () => users.length > 0

  // Get a single Github user for a detailed profile
  const getUser = username => {
    setLoading(true)
    return axios
      .get(
        `https://api.github.com/users/${username}?&client_id=
    ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
    ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      )
      .then(res => res.data)
      .then(user => {
        console.log(user)
        setUser(user)
        setLoading(false)
      })
      .catch(err => console.error(err))
  }

  // Grabs the specified users' lateast repos
  const getUserRepos = username => {
    setLoading(true)
    return axios
      .get(
        `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=
    ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
    ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      )
      .then(res => res.data)
      .then(repos => {
        console.log(repos)
        setRepos(repos)
        setLoading(false)
      })
      .catch(err => console.error(err))
  }

  // Set Alert when there's an issue
  const popAlert = (msg, type) => {
    setAlert({ msg, type })
    setTimeout(() =>  setAlert(null), 4000)
  }

    return (
      <Router>
        <div className="App">
          <Nav />
          <div className="container">
            <Alert alert={alert} />
            <Switch>
              <Route path="/about" component={About} />
              <Route
                path="/user/:login"
                render={props => (
                  <User
                    {...props}
                    user={user}
                    repos={repos}
                    getUser={getUser}
                    getUserRepos={getUserRepos}
                    loading={loading}
                  />
                )}
              />
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
                      setAlert={popAlert}
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

export default App
