import React, { useContext } from 'react'
import AlertContext from '../../context/alert/alertContext'

const Alert = () => {
  const alertContext = useContext(AlertContext)
  const alert = alertContext.alert
  return (
    alert !== null && ( // as long as the alert passed in is not null then we show the alert message
      <div className={`alert alert-${alert.type}`}>
        <i className="fas fa-info-circle">{alert.msg}</i>
      </div>
    )
  )
}

export default Alert
