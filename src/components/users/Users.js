import React, { useContext } from 'react'

import UserItem from './UserItem'
import Spinner from '../layout/Spinner'

import GithubContext from '../../context/github/githubContext'
// importing the Github Context to use it within this component

const Users = props => {
  const githubContext = useContext(GithubContext) 
  const { users, loading } = githubContext

  if (loading) {
    return <Spinner />
  } else {
    return (
      <div style={userStyle}>
        {users.map(user => {
          return <UserItem key={user.id} user={user} />
        })}
      </div>
    )
  }
}

const userStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '1rem'
}

export default Users
