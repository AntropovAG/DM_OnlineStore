import styles from './ordersList.module.css';
import OrderItem from '../OrderItem/OrderItem';
import { useEffect, useState } from 'react';
import { fetchOrders, setFirstLoading, fetchOnPageLoad } from '../../redux/ordersSlice';
import { useDispatch, useSelector } from 'react-redux';
import { InView } from 'react-intersection-observer';
import Loader from '../Loader/Loader';

export default function OrdersList() {
  const dispatch = useDispatch();
  const data = useSelector(state => state.orders.orders);
  const ordersPage = useSelector(state => state.orders.ordersPage);
  const isLoading = useSelector(state => state.orders.isLoading);
  const firstLoaded = useSelector(state => state.orders.firstLoading);
  const allOrdersLoaded = useSelector(state => state.orders.allGoodsLoaded);
  const errorMessage = useSelector(state => state.orders.error);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    dispatch(fetchOnPageLoad()).finally(() => {
      dispatch(setFirstLoading(true));
    });
  }, []);

  useEffect(() => {
    if (isInView && !isLoading && !allOrdersLoaded) {
      if (firstLoaded === true) {
        dispatch(setFirstLoading(false));
      }
      dispatch(fetchOrders(ordersPage));
    }
  }, [isInView, isLoading, allOrdersLoaded, dispatch, ordersPage, firstLoaded]);

  return (
    <>
      <div className={styles.container}>
        {firstLoaded && data.length === 0 ? (
          <>
            {errorMessage ? (
              <p className={styles.text}>{errorMessage}</p>
            ) : (
              <p className={styles.text}>Сожалеем, но заказов не найдено</p>
            )}
          </>
        ) : (
          data.map((item, index) => <OrderItem key={index} item={item} orderNumber={index} />)
        )}
      </div>

      {isLoading && <Loader />}
      
      <InView
        as="div"
        onChange={(inView) => {
          setIsInView(inView);
        }}
        threshold={0}
        rootMargin="50px 0px"
      ></InView>
    </>

  )
}
