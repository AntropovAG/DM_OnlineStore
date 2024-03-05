import Header from './components/Header'
import { Routes, Route, Navigate } from 'react-router-dom'
import ProductsList from './components/ProductsList'
import ProductInfo from './components/ProductInfo'
import './App.css'

function App() {

  return (
    <div className="container">
      <Header />
      <Routes>
        <Route path='/' element={<Navigate to="/:number" />}></Route>
        <Route path='/:number' element={<ProductsList />}></Route>
        <Route path='/orders' element={<>Здесь будут ваши заказы</>}></Route>
        <Route path='/product/:id' element={<ProductInfo />}></Route>
    </Routes>
    </div>
  )
}

export default App
