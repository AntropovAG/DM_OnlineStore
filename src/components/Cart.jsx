import styles from "./cart.module.css";
import CartWidget from "./CartWidget";

export default function Cart() {
    return (
        <>
            <button className={styles.cartButton} type="button">
                <img className={styles.img} src="/images/cart.png" alt="Корзина" />
                <p className={styles.text}>Корзина</p>
                <span className={styles.text}>(0)</span>
            </button>
            <CartWidget />
        </>

    );
}
