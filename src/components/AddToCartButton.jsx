import { useState } from "react";
import Button from "./Button";
import CountButtons from "./CountButtons";
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
                <Button buttonName={"Добавить в корзину"} handleClick={increment}/>
            ) : (
                <div className={styles.buttonsContainer}>
                    <CountButtons  decrement={decrement} increment={increment} count={count} />
                    <Button buttonName={"Оформить заказ"} handleClick={handleClick}/>
                </div>
            )}
        </div>
    );
}
