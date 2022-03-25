import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CheckoutProduct from './CheckoutProduct'
import './Payment.css'
import { useStateValue } from './StateProvider'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { getBasketTotal } from './reducer'
import axios from './axios'
import CurrencyFormat from 'react-currency-format'
import { db } from './firebase'
import { collection, doc } from 'firebase/firestore'

const Payment = () => {
  const [{ basket, user }, dispatch] = useStateValue()

  const [processing, setProcessing] = useState("")
  const [succeeded, setSucceeded] = useState(false)
  const [error, setError] = useState(null)
  const [disabled, setDisabled] = useState(true)
  const [clientSecret, setClientSecret] = useState(true)

  const stripe = useStripe()
  const elements = useElements()

  let navigate = useNavigate()

  const userCollectionRef = collection(db, "users")

  useEffect(() => {
    // generate the special stripe secret which allows us to charge a customer
    const getClientSecret = async () => {
      const response = await axios({
        method: 'post',
        // Stripe expects the total in a currencies subunits
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`
      });
      setClientSecret(response.data.clientSecret)
    }

    getClientSecret();
  }, [basket])

  const handleSubmit = async (e) => {
    e.preventDefault()

    navigate('/orders', { replace: true })
    // setProcessing(true)
    // const payload = await stripe.confirmCardPayment(clientSecret, {
    //   payment_method: {
    //     card: elements.getElement(CardElement)
    //   }
    // }).then(({ paymentIntent }) => {
    //   setSucceeded(true)
    //   setError(null)
    //   setProcessing(false)
    //   navigate("/orders", { replace: true });
    // })

    dispatch({
      type: 'EMPTY_BASKET'
    })
  }

  const handleChange = (e) => {
    setDisabled(e.empty)
    // setError(e.error ? e.error.message : "")
  }

  return (
    <div className='payment'>
      <div className='payment-container'>
        <h1>Checkout (<Link to="/checkout">{basket?.length} items</Link>)</h1>
        <div className='payment-section'>
          <div className='payment-title'>
            <h3>Delivery address: </h3>
          </div>
          <div className='payment-address'>
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>

        <div className='payment-section'>
          <div className='payment-title'>
            <h3>Review items and delivery</h3>
          </div>
          <div className='payment-items'>
            {basket.map(item => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                price={item.price}
                rating={item.rating}
                image={item.image}
              />
            ))}
          </div>
        </div>

        <div className='payment-section'>
          <div className='payment-title'>
            <h3>Payment Methods</h3>
          </div>
          <div className='payment-details'>
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className='payment-price-container'>
                <CurrencyFormat
                  renderText={(value) => (
                    <>
                      <h3>Order Total: {value}</h3>
                    </>
                  )}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button
                  disabled={processing || disabled || succeeded}
                >
                  <span>{processing ? <p>Proccessing</p> : "Buy Now"}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment