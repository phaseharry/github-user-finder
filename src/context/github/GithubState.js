import React, { useReducer } from 'react'
import axios from 'axios'
import GithubContext from './githubContext'
import GithubReducer from './githubReducer'
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS
} from '../types'

/* 
  Checking whether the application is in production or development. If it is in production mode then we will use a global 
  variable that's assigned to the process. If it is not in production then we'll use a local environment file to grab keys
*/
let githubClientId, githubClientSecret

if(process.env.NODE_ENV !== 'production'){
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET
} else {
  githubClientId = process.env.GITHUB_CLIENT_ID
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET
}

const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  }

  const [state, dispatch] = useReducer(GithubReducer, initialState)

  // Search Users
  const searchUsers = async text => {
    try {
      setLoading()
      const res = await axios.get(
        `https://api.github.com/search/users?q=${text}&client_id=
          ${githubClientId}&client_secret=
          ${githubClientSecret}`
      )
      dispatch({
        type: SEARCH_USERS,
        users: res.data.items
      })
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
  // Get a single Github user for a detailed profile
  const getUser = username => {
    setLoading()
    return axios
      .get(
        `https://api.github.com/users/${username}?&client_id=
    ${githubClientId}&client_secret=
    ${githubClientSecret}`
      )
      .then(res => res.data)
      .then(user => {
        dispatch({ type: GET_USER, user })
      })
      .catch(err => console.error(err))
  }

  // Grabs the specified users' lateast repos
  const getUserRepos = username => {
    setLoading()
    return axios
      .get(
        `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=
    ${githubClientId}&client_secret=
    ${githubClientSecret}`
      )
      .then(res => res.data)
      .then(repos => {
        dispatch({ type: GET_REPOS, repos })
      })
      .catch(err => console.error(err))
  }

  // Clear users from state
  const clearUsers = () => dispatch({ type: CLEAR_USERS })
  // Set Loading
  const setLoading = () => {
    dispatch({ type: SET_LOADING })
  }

  return (
  <GithubContext.Provider 
    value={{
      users: state.users,
      user: state.user,
      repos: state.repos,
      loading: state.loading,
      searchUsers,
      clearUsers,
      getUser,
      getUserRepos
    }}
  >
    {props.children}
  </GithubContext.Provider>)
}

export default GithubState