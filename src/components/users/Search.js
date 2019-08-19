import React, { useState, useContext } from 'react'

import GithubContext from '../../context/github/githubContext'
import AlertContext from '../../context/alert/alertContext'

const Search = props => {
  const githubContext = useContext(GithubContext)
  const alertContext = useContext(AlertContext)
  const { setAlert } = alertContext
  const { users, clearUsers } = githubContext
  const [text, setText] = useState('')
  /*
    useState takes an initial state value as the argument and returns an array. 
    The first element of the array is the actual state value and the second element 
    is an function used to update that state.
  */

  /* 
    to give functional components something like methods, 
    we can simply add functions within the functional component
  */
  const onChange = event => setText(event.target.value)

  const onSubmit = event => {
    event.preventDefault() //need to prevent the default behavior for submit (it reloads the page)
    if (!text) {
      setAlert('Please enter something', 'light')
    } else {
      githubContext.searchUsers(text)
      setText('')
    }
  }

  return (
    <div>
      <form className='form' onSubmit={onSubmit}>
        <input
          type='text'
          name='text'
          placeholder='Search Users...'
          onChange={onChange}
          value={text}
        />
        <input type='submit' value='Search' className='btn btn-dark btn-block' />
      </form>
      {users.length > 0 && (
        <button className='btn btn-light btn-block' onClick={clearUsers}>
          Clear
        </button>
      )}
    </div>
  )
}

export default Search
