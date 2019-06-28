import React, { Component } from 'react'
import Spinner from '../layout/Spinner'

class User extends Component {
  componentDidMount() {
    this.props.getUser(this.props.match.params.login) //grabs the login parameter from our url we stated in the Route in the App component
  }
  render() {
    const {
      name,
      avatar_url,
      location,
      bio,
      blog,
      login,
      html_url,
      followers,
      following,
      public_repos,
      public_gists,
      hireable
    } = this.props.user
    if (this.props.loading) {
      return <Spinner />
    }
    return <div>{name}</div>
  }
}

export default User
