import styles from "./cartItem.module.css";
import CountButtons from "./CountButtons";
import { useState } from "react";

export default function CartItem() {
    const [count, setCount] = useState(0);

    const increment = () => {
        if (count === 10) return;
        setCount((prev) => prev + 1);
    };

    const decrement = () => {
        if (count === 0) return;
        setCount((prev) => prev - 1);
    };


    const renderDeleteButton = () => {
        return count === 0 && (
            <button className={styles.deleteItemButton}>
                <img className={styles.deleteItemButtonImg} src="/images/delete_icon.png" alt="delete icon" />
                Удалить
            </button>
        );
    };

    const renderPriceContainer = () => {
        if (count === 0) return null;

        return (
            <div className={styles.orderPriceContainer}>
                {count > 1 ? (
                    <>
                        <p className={styles.orderUnitPrice}>100 &#8381; за шт.</p>
                        <p className={styles.orderBatchPrice}>200 &#8381;</p>
                    </>
                ) : (
                    <p className={styles.orderBatchPrice}>200 &#8381;</p>
                )}
            </div>
        );
    };

    return (
        <div className={styles.orderItem}>
            <img className={styles.orderImg} src="/images/test.jpg" alt="изображение товара" />
            <p className={styles.orderTitle}>Название товара</p>
            <div className={styles.buttonsContainer}>
                    <CountButtons decrement={decrement} increment={increment} count={count} />
            </div>
{renderPriceContainer()}
{renderDeleteButton()}
        </div>
    )
}