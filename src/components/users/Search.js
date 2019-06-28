import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Search extends Component {
  state = {
    text: ''
  }

  static propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired
  }

  onChange = event => this.setState({ [event.target.name]: event.target.value })

  onSubmit = event => {
    event.preventDefault() //need to prevent the default behavior for submit (it reloads the page)
    if (!this.state.text) {
      this.props.setAlert('Please enter something', 'light')
    } else {
      this.props.searchUsers(this.state.text)
      this.setState({
        text: ''
      })
    }
  }

  render() {
    const { onChange, onSubmit } = this
    const { showClear, clearUsers } = this.props
    const { text } = this.state
    return (
      <div>
        <form className="form" onSubmit={onSubmit}>
          <input
            type="text"
            name="text"
            placeholder="Search Users..."
            onChange={onChange}
            value={text}
          />
          <input
            type="submit"
            value="Search"
            className="btn btn-dark btn-block"
          />
        </form>
        {showClear && (
          <button className="btn btn-light btn-block" onClick={clearUsers}>
            Clear
          </button>
        )}
      </div>
    )
  }
}

export default Search
