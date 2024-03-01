import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import './App.css'
import Layout from './components/Layout'
import { fetchGoods, setFirstLoading } from './redux/goodsSlice'

function App() {
  const goodsPage = useSelector((state) => state.goods.goodsPage);
  const dispatch = useDispatch();
  
useEffect(() => {
  dispatch(fetchGoods(goodsPage))
  .finally(() => {
    dispatch(setFirstLoading(true));
  });
}, [])


  return (
    <>
      <Layout />
    </>
  )
}

export default App
