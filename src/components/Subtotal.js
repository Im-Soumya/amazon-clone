import React from 'react'
import { useNavigate } from 'react-router-dom'
import CurrencyFormat from 'react-currency-format'
import { getBasketTotal } from './reducer'
import { useStateValue } from './StateProvider'
import './Subtotal.css'

const Subtotal = () => {
  const [{ basket }, dispatch] = useStateValue()

  const navigate = useNavigate()
  return (
    <div className='subtotal'>
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket.length} items): <strong>{value}</strong>
            </p>
            <small className='subtotal-gift'>
              <input type="checkbox" />This order contains gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />

      <button onClick={(e) => navigate("/payment")}>Proceed to checkout</button>
    </div>
  )
}

export default Subtotal