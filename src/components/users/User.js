import React, { useEffect, useContext, Fragment } from 'react'
import { Link } from 'react-router-dom'

import Spinner from '../layout/Spinner'
import Repos from '../repos/Repos'

import GithubContext from '../../context/github/githubContext'

const User = props => {
  const { match } = props
  const githubContext = useContext(GithubContext)
  const { user, loading, getUser, repos, getUserRepos } = githubContext


  useEffect(() => {
    getUser(match.params.login) //grabs the login parameter from our url we stated in the Route in the App component
    getUserRepos(match.params.login)
    // eslint-disable-next-line
  }, [])
  /* useEffect hooks runs the effect(callback function passed in) after every render.
   This would lead to an infinite loop if you want to make a data fetch and store it in state (componentDidMount). 
   To stop it, we pass in an empty array as the 2nd argument to useEffect.
   Within the array is where we define conditions when we want the useEffect callback to run. 
   If no array is passed in as the 2nd argument then it defaults to run after every render. 
   Passing it an empty array causes it to run once and that mimics the componentDidMount lifecycle method.
  */

  const {
    name,
    avatar_url,
    location,
    bio,
    blog,
    login,
    html_url,
    company,
    followers,
    following,
    public_repos,
    public_gists,
    hireable
  } = user

  if (loading) {
    return <Spinner />
  }
  return (
    <Fragment>
      <Link to='/' className='btn btn-light'>
        Back to Search
      </Link>
      Hireable:{' '}
      {hireable ? (
        <i className='fas fa-check text-success' />
      ) : (
        <i className='fas fa-times-circle text-danger' />
      )}
      <div className='card grid-2'>
        <div className='all-center'>
          <img
            src={avatar_url}
            className='round-img'
            alt='Github user profile'
            style={{ width: '150px' }}
          />
          <h1>{name}</h1>
          <p>Location: {location ? location : 'N/A'}</p>
        </div>
        <div>
          {bio && (
            <Fragment>
              <h3>Bio</h3>
              <p>{bio}</p>
            </Fragment>
          )}
          <a href={html_url} className='btn btn-dark my-1'>
            Visit Github Profile
          </a>
          <ul>
            <li>
              {login && (
                <Fragment>
                  <strong>Username: </strong> {login}
                </Fragment>
              )}
            </li>
            <li>
              {company && (
                <Fragment>
                  <strong>Company: </strong> {company}
                </Fragment>
              )}
            </li>
            <li>
              {blog && (
                <Fragment>
                  <strong>Website: </strong> {blog}
                </Fragment>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className='card text-center'>
        <div className='badge badge-primary'>Followers: {followers}</div>
        <div className='badge badge-success'>Following: {following}</div>
        <div className='badge badge-light'>Public Repos: {public_repos}</div>
        <div className='badge badge-dark'>Public Gists: {public_gists}</div>
      </div>
      <Repos repos={repos} />
    </Fragment>
  )
}

export default User
