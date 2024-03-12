import Header from './components/Header'
import { Routes, Route, Navigate } from 'react-router-dom'
import ProductsList from './components/ProductsList'
import ProductInfo from './components/ProductInfo'
import NotFound from './components/NotFound'
import './App.css'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchCart } from './redux/cartSlice'

function App() {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(fetchCart())
  }, []);

  return (
    <div className="container">
      <Header />
      <Routes>
        <Route path='/orders' element={<>Здесь будут ваши заказы</>}></Route>
        <Route path='/product/:id' element={<ProductInfo />}></Route>
        <Route path='/products/:number' element={<ProductsList />}></Route>
        <Route path='*' element={<NotFound />}></Route>
        <Route path='/' element={<Navigate to="/products/:number" />}></Route>
    </Routes>
    </div>
  )
}

export default App
