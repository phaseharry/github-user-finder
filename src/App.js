import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// importing both the Github and Alert state created by the Context API
import GithubState from './context/github/GithubState'
import AlertState from './context/alert/AlertState'

import './App.css'

// layout components
import Nav from './components/layout/Nav'
import Alert from './components/layout/Alert'

// user components
import User from './components/users/User'

//pages
import About from './components/pages/About'
import Home from './components/pages/Home'
import NotFound from './components/pages/NotFound'

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
    // Wrapping the entire application with the github and alert state so it has access to it
    return (
      <GithubState>
        <AlertState>
        <Router>
          <div className="App">
            <Nav />
            <div className="container">
              <Alert />
              <Switch>
                <Route path="/about" component={About} />
                <Route
                  path="/user/:login"
                  render={props => (
                    <User
                      {...props}
                    />
                  )}
                />
                <Route
                  exact
                  path="/"
                  render={props => <Home {...props}/>} //props in this case is the route props (path, history, etc)
                />
                <Route component={NotFound}/> 
                {/* Putting it at the end means when React will check for the inputted url and if it does not match any known routes, then render this page  */}
              </Switch>
            </div>
          </div>
        </Router>
        </AlertState>
      </GithubState>
    )

}

export default App
