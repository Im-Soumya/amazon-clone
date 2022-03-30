import React from 'react'
import './CheckoutProduct.css'
import { useStateValue } from './StateProvider'

const CheckoutProduct = ({ id, image, title, price, rating, hideButton }) => {
  const [{ basket }, dispatch] = useStateValue()

  const removeFromBasket = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id
    })
  }

  return (
    <div className='checkoutProduct'>
      <img className='checkoutProduct-img' src={image} />
      <div className='checkoutProduct-info'>
        <p className='checkoutProduct-title'>{title}</p>
        <p className='checkoutProduct-price'>
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className='checkoutProduct-rating'>
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p key={i}>⭐</p>
            ))}
        </div>
        {!hideButton && <button onClick={removeFromBasket}>Remove from basket</button>}
      </div>
    </div>
  )
}

export default CheckoutProduct