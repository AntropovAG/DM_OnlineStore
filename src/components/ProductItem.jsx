import { Link } from 'react-router-dom';
import styles from './productItem.module.css'
import ProductRaiting from './ProductRaiting';

export default function ProductItem(item) {
    const { id, picture, title, rating, price } = item;

    const formattedPrice = new Intl.NumberFormat('ru-RU').format(price);

    return (
        <Link to={id} className={styles.container}>
            <img className={styles.img} src={picture} alt="Фото продукта" />
            <div className={styles.infoContainer}>
                <h2 className={styles.name}>{title}</h2>
                <ProductRaiting rating={rating}/>
                <p className={styles.price}>{formattedPrice} &#8381;</p>
            </div>
        </Link>

    )
}
