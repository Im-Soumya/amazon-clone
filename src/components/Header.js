import React from 'react'
import './Header.css'
// import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { useStateValue } from './StateProvider'
import { auth } from './firebase';

const Header = () => {
  const [{ basket, user }, dispatch] = useStateValue()

  const handleAuth = async () => {
    await signOut(auth)
  }
  return (
    <div className='header'>
      <Link to='/'>
        <img
          className='header-logo'
          src='http://pngimg.com/uploads/amazon/amazon_PNG11.png'
        />
      </Link>

      <div className='header-search'>
        <input
          type='text'
          className='header-search-input'
        />
        <SearchIcon className='header-search-icon' />
      </div>

      <div className='header-nav'>
        <Link to={!user && "/login"}>
          <div onClick={handleAuth} className='header-option'>
            <span className='header-optionLine1'>Hello {user ? user.email : 'Guest'}</span>
            <span className='header-optionLine2'>{user ? 'Sign out' : 'Sign in'}</span>
          </div>
        </Link>
        <div className='header-option'>
          <span className='header-optionLine1'>Returns</span>
          <span className='header-optionLine2'>Orders</span>
        </div>
        <div className='header-option'>
          <span className='header-optionLine1'>Your</span>
          <span className='header-optionLine2'>Prime</span>
        </div>

        <Link to='/checkout'>
          <div className='header-option-basket'>
            <ShoppingCartIcon />
            <span className='header-optionLine2 header-basketCount'>{basket?.length}</span>
          </div>
        </Link>

      </div>
    </div>
  )
}

export default Header