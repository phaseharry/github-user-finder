import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class Nav extends Component {
  //using defaultProps to give our icons their font awesome class and title as well
  static defaultProps = {
    title: 'Github Finder',
    icon: 'fab fa-github'
  }
  static propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
  }
  render() {
    return (
      <div className="navbar bg-primary">
        <h1>
          <i className={this.props.icon} /> {this.props.title}
        </h1>
      </div>
    )
  }
}

export default Nav
