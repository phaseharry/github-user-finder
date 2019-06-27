import React, { Fragment } from 'react'
import spinner from './spinner.gif'
//we can import an image due to how Create-React-App's webpack is configured under the hood

const Spinner = () => {
  return (
    <Fragment>
      <img
        src={spinner}
        alt="Loading..."
        style={{ width: '200px', margin: 'auto', display: 'block' }}
      />
    </Fragment>
  )
}

export default Spinner
