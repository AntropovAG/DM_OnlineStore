import Button from "./Button";
import CountButtons from "./CountButtons";
import styles from "./addToCartButton.module.css";
import { useSelector, useDispatch } from "react-redux";
import { updateCartData, deleteItem } from "../redux/cartSlice";

export default function AddToCartButton({ id }) {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.cart.cartData.data);
    const isInCart = data.some((item) => item.id === id);
    console.log("is in cart? ", isInCart, "ID: ", id, "DATA: ", data)
    const quantity = isInCart ? data.find((item) => item.id === id).quantity : 0;


    const increment = () => {
        if (quantity > 10) return;
        let counting = quantity + 1;
        dispatch(updateCartData({ id, count: counting }));
    };

    const decrement = () => {
        if (quantity < 0) return;
        let counting = quantity - 1;
        if (counting === 0) {
            console.log("Удаление");
            dispatch(deleteItem({ id }));
        } else {
            dispatch(updateCartData({ id, count: counting }));
        }

    };


    const handleClick = () => {
        console.log("Купить");
    };

    return (
        <div>
            {quantity === 0 ? (
                <Button buttonName={"Добавить в корзину"} handleClick={increment} />
            ) : (
                <div className={styles.buttonsContainer}>
                    <CountButtons decrement={decrement} increment={increment} count={quantity} />
                    <Button buttonName={"Оформить заказ"} handleClick={handleClick} />
                </div>
            )}
        </div>
    );
}
