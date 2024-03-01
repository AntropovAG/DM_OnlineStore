import { Routes, Route } from 'react-router-dom'
import Header from './Header'
import ProductInfo from './ProductInfo'
import ProductsList from './ProductsList'
import styles from './layout.module.css'


function Layout() {

    return (
      <div className={styles.container}>
        <Header />
        <Routes>
          <Route path='/' element={<ProductsList />}></Route>
          <Route path='/orders' element={<>Здесь будут ваши заказы</>}></Route>
          <Route path='/:id' element={<ProductInfo />}></Route>
      </Routes>
      </div>
    )
  }
  
  export default Layout
  