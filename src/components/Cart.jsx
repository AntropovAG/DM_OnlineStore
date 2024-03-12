import styles from "./cart.module.css";
import CartWidget from "./CartWidget";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Cart() {
    const [isOpen, setIsOpen] = useState(false)

    const cartQuantity = useSelector((state) => state.cart.cartContent.data.length);
    // const data = {
    //     "data": [
    //       {
    //         "id": "4966233",
    //         "quantity": 2
    //       },
    //       {
    //         "id": "6024091",
    //         "quantity": 5
    //       },
    //       {
    //         "id": "3511821",
    //         "quantity": 3
    //       }
    //     ]
    // };


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
