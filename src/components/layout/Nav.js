import React from 'react'
import PropTypes from 'prop-types'

const Nav = props => {
  //using defaultProps to give our icons their font awesome class and title as well
  return (
    <div className="navbar bg-primary">
      <h1>
        <i className={props.icon} /> {props.title}
      </h1>
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
