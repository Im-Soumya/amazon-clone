import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import './Orders.css'
import { useStateValue } from './StateProvider';
import Order from './Order';
import { query, collection, onSnapshot, orderBy } from 'firebase/firestore';

const Orders = () => {
  const [{ basket, user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      const ref = collection(db, 'users')
      const orderedOrders = query(ref, orderBy('created', 'desc'))
      onSnapshot(orderedOrders, snapShot => {
        setOrders(snapShot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        })))
      })
    } else {
      setOrders([])
    }
  }, [user])

  return (
    <div className='orders'>
      <h1>Your Orders</h1>
      <div className='orders_order'>
        {orders?.map(order => (
          <Order order={order} />
        ))}
      </div>
    </div>
  )
}

export default Orders