import styles from './ordersList.module.css';
import OrderItem from './OrderItem';
import { useEffect } from 'react';
import { fetchOrders } from '../redux/ordersSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function OrdersList() {
    const dispatch = useDispatch();
    const ordersPage = useSelector(state => state.orders.ordersPage);

useEffect(() => {
    dispatch(fetchOrders(ordersPage));
}, []);

  return (
    <div className={styles.container}>
      <OrderItem />
      <OrderItem />
      <OrderItem />
    </div>
  )
}
