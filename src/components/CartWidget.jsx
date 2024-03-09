import styles from "./cartWidget.module.css";
import CartItem from "./CartItem";
import Button from "./Button";

export default function CartWindet() {
  const handleClick = () => {
    console.log('Оформление заказа!!!')
  }

  return (
    <div className={styles.container}>
      <CartItem />
      <CartItem />
      <CartItem />
      <div className={styles.totalPriceContainer}>
        <p className={styles.totalPriceText}>Итого:</p>
        <p className={styles.totalPriceNumber}>500 &#8381;</p>
      </div>
      <Button buttonName={"Оформить заказ"} handleClick={handleClick} />
    </div>
  )
}
