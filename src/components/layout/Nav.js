import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Nav = props => {
  //using defaultProps to give our icons their font awesome class and title as well
  return (
    <div className="navbar bg-primary">
      <h1>
        <i className={props.icon} /> {props.title}
      </h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About App</Link>
        </li>
      </ul>
    </div>
  )
}

Nav.defaultProps = {
  title: 'Github Finder',
  icon: 'fab fa-github'
}

Nav.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
}

export default Nav
