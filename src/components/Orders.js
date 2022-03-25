import React from 'react'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { green } from '@mui/material/colors';
import './Orders.css'

const Orders = () => {
  const styles = {
    largeIcon: {
      fontSize: "150px",
      color: "green",
      textAlign: "center",
      padding: "100px auto",
    },
  }
  return (
    <div className='orders'>
      <h1 className="orders-title">Order Confirmed</h1>
      <CheckCircleOutlineIcon
        style={styles.largeIcon}
        className="check-icon"
      />
      <h3 className='orders-footer'>Thank You!</h3>
    </div>
  )
}

export default Orders