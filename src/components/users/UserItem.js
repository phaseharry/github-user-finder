import React from 'react'
import PropTypes from 'prop-types'

const UserItem = ({ user: { login, avatar_url, html_url } }) => {
  /* 
    destructing in the parameter works as well.
    First, we're destructing the user out of the props object.
    Then we destructure the specific key-value pairs within the user object. 
  */
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

UserItem.propTypes = {
  user: PropTypes.object.isRequired
}

export default UserItem
