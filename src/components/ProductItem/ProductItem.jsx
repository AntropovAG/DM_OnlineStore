import { Link } from 'react-router-dom';
import styles from './productItem.module.css'
import ProductRaiting from '../ProductRating/ProductRaiting';
import { formatPrice } from '../../utils/supportFunctions';
import ProgressiveImage from 'react-progressive-graceful-image';
import placeholder from '/images/image_loader_icon.gif'

export default function ProductItem(item) {
    const { id, picture, title, rating, price } = item;

    return (
        <Link to={`/product/${id}`} className={styles.container} >
            <ProgressiveImage src={picture} placeholder={placeholder}>
                {(src) => <img loading='lazy' className={styles.img} src={src} alt="Фото продукта" />}
            </ProgressiveImage>
            <div className={styles.infoContainer}>
                <h2 className={styles.name}>{title}</h2>
                <ProductRaiting rating={rating}/>
                <p className={styles.price}>{formatPrice(price)} &#8381;</p>
            </div>
        </Link>
    )
}
