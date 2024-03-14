import Header from './components/Header'
import { Routes, Route, Navigate } from 'react-router-dom'
import OrdersList from './components/OrdersList'
import ProductsList from './components/ProductsList'
import ProductInfo from './components/ProductInfo'
import NotFound from './components/NotFound'
import Notification from './components/Notification'
import './App.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCart } from './redux/cartSlice'

function App() {
  const dispatch = useDispatch()
  const popupIsOpen = useSelector(state => state.cart.popupIsOpen);
  
  useEffect(() => {
    dispatch(fetchCart())
  }, [dispatch]);

  return (
    <div className="container">
      <Header />
      <Routes>
        <Route path='/orders' element={<OrdersList />}></Route>
        <Route path='/product/:id' element={<ProductInfo />}></Route>
        <Route path='/products/:number' element={<ProductsList />}></Route>
        <Route path='*' element={<NotFound />}></Route>
        <Route path='/' element={<Navigate to="/products/:number" />}></Route>
    </Routes>
    {popupIsOpen && <Notification />}
    </div>
  )
}

export default App
