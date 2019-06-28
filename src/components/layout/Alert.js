import React from 'react'

const Alert = ({ alert }) => {
  // alert is deconstructured here
  return (
    alert !== null && ( // as long as the alert passed in is not null then we show the alert message
      <div className={`alert alert-${alert.type}`}>
        <i className="fas fa-info-circle">{alert.msg}</i>
      </div>
    )
  )
}

export default Alert
