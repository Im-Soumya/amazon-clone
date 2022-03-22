import './App.css';
import { useEffect } from 'react'
import Header from './components/Header'
import Checkout from './components/Checkout'
import Home from './components/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/Login';
import { onAuthStateChanged } from 'firebase/auth';
import { useStateValue } from './components/StateProvider';
import { auth } from './components/firebase';
import Payment from './components/Payment'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

const promise = loadStripe("pk_test_51Kg9e5SHXPmfMBIxZFe24fCMsxMUN3ZN0FUeeWIxlkTgomLAnAu3U0vba0wLGvptueMOSp0joBCIYmxfroN4kKjv00dfbPVJDq")

function App() {
  const [{ }, dispatch] = useStateValue()

  useEffect(() => {
    //will run only once when the content loads
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log(currentUser)
        dispatch({
          type: "SET_USER",
          user: currentUser
        })
      } else {
        dispatch({
          type: "SET_USER",
          user: null
        })
      }
    })
  }, [])

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/payment' element={<><Header /><Elements stripe={promise}><Payment /></Elements></>} />
          <Route path='/login' element={<Login />} />
          <Route path="/checkout" element={<><Header /><Checkout /></>} />
          <Route path="/" element={<><Header /><Home /></>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
