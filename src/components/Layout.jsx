import { Routes, Route } from 'react-router-dom'
import Header from './Header'
import ProductsList from './ProductsList'

import styles from './layout.module.css'

function Layout() {

    return (
      <div className={styles.container}>
        <Header />
        <Routes>
          <Route path='/' element={<ProductsList />}></Route>
          <Route path='/orders' element={<>Здесь Будут ваши заказы</>}></Route>  
      </Routes>
      </div>
    )
  }
  
  export default Layout
  