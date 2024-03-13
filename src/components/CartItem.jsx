import styles from "./cartItem.module.css";
import CountButtons from "./CountButtons";
import { formatPrice } from "../utils/supportFunctions";
import { updateCartData, deleteItem } from "../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";

export default function CartItem({item}) {
    const isLoading = useSelector(state => state.cart.isLoading);
    const {quantity} = item;
    const {picture, title, price, id} = item.product;
    const batchPrice = () => {
        return quantity * price;
    }
    const dispatch = useDispatch();

    const increment = () => {
        if (quantity > 10) return;
        if (!isLoading) {
        let counting = quantity + 1;
        dispatch(updateCartData({id, count: counting}));
        }
    };

    const decrement = () => {
        if (quantity < 0) return;
        if (!isLoading) {
        let counting = quantity - 1;
        dispatch(updateCartData({id, count: counting}));
    }
    };

    const deleteItemFromCart = () => {
        if (!isLoading) {
        dispatch(deleteItem({id}));
        }
    }

    const renderDeleteButton = () => {
        return quantity === 0 && (
            <button className={styles.deleteItemButton} onClick={deleteItemFromCart}>
                <img className={styles.deleteItemButtonImg} src="/images/delete_icon.png" alt="delete icon" />
                Удалить
            </button>
        );
    };

    const renderPriceContainer = () => {
        if (quantity === 0) return null;

        return (
            <div className={styles.orderPriceContainer}>
                {quantity > 1 ? (
                    <>
                        <p className={styles.orderUnitPrice}>{formatPrice(price)} &#8381; за шт.</p>
                        <p className={styles.orderBatchPrice}>{formatPrice(batchPrice())} &#8381;</p>
                    </>
                ) : (
                    <p className={styles.orderBatchPrice}>{formatPrice(price)} &#8381;</p>
                )}
            </div>
        );
    };

    return (
        <div className={styles.orderItem}>
            <img className={styles.orderImg} src={picture} alt="изображение товара" />
            <p className={styles.orderTitle}>{title}</p>
            <div className={styles.buttonsContainer}>
                    <CountButtons decrement={decrement} increment={increment} count={quantity} />
            </div>
{renderPriceContainer()}
{renderDeleteButton()}
        </div>
    )
}