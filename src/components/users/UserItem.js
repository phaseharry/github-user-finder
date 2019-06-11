import React, { Component } from 'react'

class UserItem extends Component {
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
    id: 'id',
    login: 'mojombom',
    avatar_url: 'https://avatars0.githubusercontent.com/u/1?v=4',
    html_url: 'https://github.com/mojombo'
  }

  render() {
    const { id, login, avatar_url, html_url } = this.state
    return (
      <div className="card text-center">
        <img
          src={avatar_url}
          alt=""
          className="round-img"
          style={{ width: '60px' }}
        />
        <h3>{login}</h3>
        <div>
          <a
            href={html_url}
            className="btn btn-dark btn-sm my-1"
            rel="noopener noreferrer"
            target="_blank">
            More
          </a>
        </div>
      </div>
    )
  }
}

export default UserItem
