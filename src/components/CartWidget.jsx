import styles from "./cartWidget.module.css";
import CartItem from "./CartItem";
import Button from "./Button";
import { useSelector, useDispatch } from "react-redux";
import { formatPrice } from "../utils/supportFunctions";
import { useEffect } from "react";
import { updateCart } from "../redux/cartSlice";

export default function CartWindet({ isOpen }) {
  const cartContent = useSelector((state) => state.cart.cartContent.data);
  const totalPrice = cartContent.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cart.cartData);

  const handleClick = () => {
    console.log('Оформление заказа!!!')

  }

  useEffect(() => {
    
      console.log(cartData)
    
    dispatch(updateCart(cartData));
    
}, [cartData, dispatch]);


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
      <Button buttonName={"Оформить заказ"} handleClick={handleClick} />
    </div>
  )
}

