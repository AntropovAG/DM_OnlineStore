import { Link } from 'react-router-dom';
import styles from './productItem.module.css'
import ProductRaiting from './ProductRaiting';
import { formatPrice } from '../utils/supportFunctions';

export default function ProductItem(item) {
    const { id, picture, title, rating, price } = item;

    return (
        <Link to={`/product/${id}`} className={styles.container} >
            <img loading='lazy' className={styles.img} src={picture} alt="Фото продукта" />
            <div className={styles.infoContainer}>
                <h2 className={styles.name}>{title}</h2>
                <ProductRaiting rating={rating}/>
                <p className={styles.price}>{formatPrice(price)} &#8381;</p>
            </div>
        </Link>

    )
}
