import styles from "./cart.module.css";
import CartWidget from "../CartWidget/CartWidget";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Cart() {
    const [isOpen, setIsOpen] = useState(false)

    const cartQuantity = useSelector((state) => state.cart.cartContent.data.length);
    
    //Если нужно посчитать количество товаров в корзине, а не количество позиций, то можно использовать следующий код:
    // const cartQuantity = useSelector((state) => state.cart.cartContent.data.reduce((acc, item) => acc + item.quantity, 0));


    const toggleIsOpen = () => {
        setIsOpen(!isOpen)
    }



    return (
        <>
            <button className={styles.cartButton} type="button" onClick={toggleIsOpen}>
                <img className={styles.img} src="/images/cart.png" alt="Корзина" />
                <p className={styles.text}>Корзина</p>
                <span className={styles.text}>({cartQuantity?cartQuantity:0})</span>
            </button>
            <CartWidget isOpen={isOpen} />
        </>

    );
}
