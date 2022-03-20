import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Login.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const signIn = (e) => {
    e.preventDefault()
  }

  const register = (e) => {
    e.preventDefault()
  }

  return (
    <div className='login'>
      <Link to='/'>
        <img
          className="login-logo"
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png'
        />
      </Link>

      <div className='login-container'>
        <h1>Sign-in</h1>
        <form>
          <h5>E-mail</h5>
          <input
            type='text'
            value={email}
            onChange={(e) => setEmail.apply(e.currentTarget.value)}
          />
          <h5>Password</h5>
          <input
            type='password'
            value={password} onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <button
            onClick={signIn}
            className='login-signInButton'>Sign In</button>
          <p>
            By signing-in you agree to Amazon Clone's Conditions of the Use & Sale. Please see our Privacy Notice, out Cookies Noticeand out Interest-Based Ads Notice.
          </p>
          <button
            onClick={register}
            className='login-registerButton'>Create your Amazon Account</button>
        </form>
      </div>
    </div>
  )
}

export default Login