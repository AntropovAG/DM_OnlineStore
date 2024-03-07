import { useState } from "react";
import styles from "./addToCartButton.module.css";

export default function AddToCartButton() {
    const [count, setCount] = useState(0);

    const increment = () => {
        if (count === 10) return;
        setCount((prev) => prev + 1);
    };

    const decrement = () => {
        if (count === 0) return;
        setCount((prev) => prev - 1);
    };

    const handleClick = () => {
        console.log("Купить", count);
    };

    return (
        <div>
            {count === 0 ? (
                <button className={styles.button} onClick={increment}>
                    Добавить в корзину
                </button>
            ) : (
                <div className={styles.buttonsContainer}>
                    <div className={styles.countContainer}>
                        <button
                            className={styles.countButton}
                            onClick={decrement}
                            disabled={count === 0}
                        >
                            -
                        </button>
                        <span className={styles.countText}>{count}</span>
                        <button
                            className={styles.countButton}
                            onClick={increment}
                            disabled={count === 10}
                        >
                            +
                        </button>
                    </div>
                    <button className={styles.button} onClick={handleClick}>
                        Оформить заказ
                    </button>
                </div>
            )}
        </div>
    );
}
