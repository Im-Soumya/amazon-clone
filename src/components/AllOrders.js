import React from 'react'
import CheckoutProduct from './CheckoutProduct'
import { useStateValue } from './StateProvider'

const AllOrders = () => {
  const [{ basket, user }, dispatch] = useStateValue()
  return (
    <div className='allOrders'>
      <h1>Your Orders</h1>
      {basket.map(item => (
        <CheckoutProduct
          id={item.id}
          title={item.title}
          image={item.image}
          price={item.price}
          rating={item.rating}
        />
      ))}
    </div>
  )
}

export default AllOrders