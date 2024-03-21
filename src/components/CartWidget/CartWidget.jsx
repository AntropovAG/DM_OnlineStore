import styles from "./cartWidget.module.css";
import CartItem from "../CartItem/CartItem";
import Button from "../Button/Button";
import { useSelector, useDispatch } from "react-redux";
import { formatPrice } from "../../utils/supportFunctions";
import { useEffect } from "react";
import { updateCart, submitCart } from "../../redux/cartSlice";
import { maxAmount } from "../../utils/constants";
import { useLocation } from "react-router-dom";
import { fetchOnPageLoad, setFirstLoading } from "../../redux/ordersSlice";

export default function CartWindet({ isOpen, setIsOpen }) {
  const cartContent = useSelector((state) => state.cart.cartContent.data);
  const totalPrice = cartContent.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const isSubmitting = useSelector((state) => state.cart.isSubmitting);
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cart.cartData);
  const initialLoad = useSelector((state) => state.cart.initialLoad);
  const location = useLocation();
  const isOnOrdersPage = location.pathname === "/orders";

  const isValid = () => {
    if (cartContent.length === 0) {
      return false;
    }
    if (cartContent.some(item => item.quantity === 0)) {
      return false;
    }
    if (totalPrice === 0) {
      return false;
    }
    if (totalPrice > maxAmount) {
      return false;
    }
    if (isSubmitting) {
      return false;
    }
    return true;
  }

  const errorSpan = () => {
    if (cartContent.some(item => item.quantity === 0)) {
      return (<span className={styles.errorMessage}>Количество товара не должно быть равно 0</span>);
    }
    if (cartContent.length !== 0 && totalPrice === 0) {
      return (<span className={styles.errorMessage}>Сумма заказа не должна быть равна 0</span>);
    }
    if (totalPrice > maxAmount) {
      return (<span className={styles.errorMessage}>Сумма заказа не должна превышать 10 000 рублей</span>);
    }
    if (cartContent.length === 0) {
      return (<span className={styles.errorMessage}></span>);
    }
    return (<span className={styles.errorMessage}></span>);
  }

  const handleClick = () => {
    if (!isSubmitting) {
        dispatch(submitCart()).then(() => {
          if (isOnOrdersPage) {
            dispatch(fetchOnPageLoad()).finally(() => {
              dispatch(setFirstLoading(true));
            });
          }
          setIsOpen(false);
        })
    }
  }

  useEffect(() => {
    if (!initialLoad) {
      dispatch(updateCart(cartData));
    }
  }, [cartData, dispatch, initialLoad]);


  return (
    <div className={`${styles.container} ${isOpen ? styles.visible : ""}`}>
      {cartContent.length === 0 ? (
        <p className={styles.emptyCartText}>Корзина пуста</p>
      ) : (cartContent.map(item => <CartItem key={item.product.id} item={item} />
      ))}

      <div className={styles.totalPriceContainer}>
        <p className={styles.totalPriceText}>Итого:</p>
        <p className={styles.totalPriceNumber}>{formatPrice(totalPrice)} &#8381;</p>
      </div>
      {errorSpan()}
      <Button buttonName={isSubmitting? "Загрузка" : "Оформить заказ"} handleClick={handleClick} disabled={!isValid()} />
    </div>
  )
}

