import styles from './orderItem.module.css';
import Button from '../Button/Button';
import { formatDate, formatPrice } from '../../utils/supportFunctions';
import { updateFromOrder } from '../../redux/cartSlice';
import { useDispatch } from 'react-redux';

export default function OrderItem({item, orderNumber}) {
    const orderDate = formatDate(item[0].createdAt);
    const totalOrderSum = formatPrice(item.reduce((acc, item) => acc + item.product.price * item.quantity, 0));
    const dispatch = useDispatch();


    const handleClick = () => {
        let orderData = [];
        item.forEach((item) => {
            orderData.push({id: item.product.id, quantity: item.quantity});
        });
        dispatch(updateFromOrder(orderData));
    };

    return (
        <div className={styles.container}>
            <div className={styles.orderNumberContainer}>
                <h2 className={styles.title}>Заказ</h2>
                <p className={styles.orderNumber}>№{orderNumber}</p>
            </div>

            <ul className={styles.goods}>
                {item.map((data, index) => {
                    return (
                        <li key={index}>
                            <img className={styles.goodImg} src={data.product.picture} alt="изображение товара" />
                        </li>
                    )
                })}
            </ul>

            <div className={styles.orderDescriptionContainer}>
                <div className={styles.titleContainer}>
                    <p className={styles.title}>Оформлено</p>
                    <p className={styles.title}>На сумму</p>
                </div>
                <div className={styles.infoContainer}>
                    <p className={styles.description}>{orderDate}</p>
                    <p className={styles.description}>{totalOrderSum} &#8381;</p>
                </div>
                <Button buttonName="Повторить" handleClick={handleClick} />
            </div>

        </div>
    )
}
