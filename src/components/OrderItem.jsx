import styles from './orderItem.module.css';
import Button from './Button';
import { formatDate } from '../utils/supportFunctions';
import { formatPrice } from '../utils/supportFunctions';

export default function OrderItem({item}) {
    const orderDate = formatDate(item[0].createdAt);
    const totalOrderSum = formatPrice(item.reduce((acc, item) => acc + item.product.price, 0));
    const orderNumber = 1111;

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
                <Button buttonName="Повторить" handleClick={() => {}} />
            </div>

        </div>
    )
}
