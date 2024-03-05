// import { useEffect } from 'react'
// import { useDispatch, useSelector } from "react-redux";
import Header from './components/Header'
import { Routes, Route } from 'react-router-dom'
import ProductsList from './components/ProductsList'
import ProductInfo from './components/ProductInfo'
import './App.css'
// import Layout from './components/Layout'
// import { fetchGoods, setFirstLoading } from './redux/goodsSlice'

function App() {
  // const goodsPage = useSelector((state) => state.goods.goodsPage);
  // const dispatch = useDispatch();
  



  return (
    <div className="container">
      <Header />
      <Routes>
        <Route path='/' element={<ProductsList />}></Route>
        <Route path='/orders' element={<>Здесь будут ваши заказы</>}></Route>
        <Route path='/:id' element={<ProductInfo />}></Route>
    </Routes>
    </div>
  )
}

export default App
