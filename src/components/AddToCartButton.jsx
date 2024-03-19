import Button from "./Button";
import CountButtons from "./CountButtons";
import styles from "./addToCartButton.module.css";
import { useSelector, useDispatch } from "react-redux";
import { updateCartData, deleteItem, setOneItemInCart, submitOneItem, setCartData } from "../redux/cartSlice";
import { maxAmount } from "../utils/constants";

export default function AddToCartButton({ id, totalPrice }) {
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.cart.isLoading);
    const isSubmitting = useSelector(state => state.cart.isSubmitting);
    const data = useSelector((state) => state.cart.cartData.data);
    const isInCart = data.some((item) => item.id === id);
    const quantity = isInCart ? data.find((item) => item.id === id).quantity : 0;

    const isValid = () => {
        if (isSubmitting || isLoading) {
            return false;
        }
        if (totalPrice > maxAmount) {
            return false;
        }
        return true;
    }

    const increment = () => {
        if (quantity > 10) return;
        if (!isLoading) {
        let counting = quantity + 1;
        dispatch(updateCartData({ id, count: counting }));
        }
    };

    const decrement = () => {
        if (quantity < 0) return;
        if (!isLoading) {
        let counting = quantity - 1;
        if (counting === 0) {
            dispatch(deleteItem({ id }));
        } else {
            dispatch(updateCartData({ id, count: counting }));
        }
    }
    };


    const handleClick = () => {
        if (!isSubmitting || !isLoading) {
            const remainingCartItemsData = {
                "data": data.filter((item) => item.id !== id)
            }
            const currentItemData = {
                "data": data.filter((item) => item.id === id)
            }
            dispatch(setOneItemInCart(currentItemData))
            dispatch(submitOneItem())
            dispatch(setCartData(remainingCartItemsData))
        }
    };

    return (
        <div>
            {quantity === 0 ? (
                <Button buttonName={"Добавить в корзину"} handleClick={increment} />
            ) : (
                <div className={styles.buttonsContainer}>
                    <CountButtons decrement={decrement} increment={increment} count={quantity} />
                    <Button buttonName={isSubmitting ? "Загрузка" : "Оформить заказ"} handleClick={handleClick} disabled={!isValid()}/>
                </div>
            )}
        </div>
    );
}
