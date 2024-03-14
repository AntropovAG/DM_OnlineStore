import styles from './orderItem.module.css';

export default function OrderItem() {
    const testImages = [
        './images/test.jpg',
        './images/test.jpg',
        './images/test.jpg',
        './images/test.jpg',
        './images/test.jpg',
        './images/test.jpg',
        './images/test.jpg',
    ]

    return (
        <div className={styles.container}>
            <div className={styles.orderNumberContainer}>
                <h2 className={styles.title}>Заказ</h2>
                <p className={styles.orderNumber}>№11111</p>
            </div>

            <ul className={styles.goods}>
                {testImages.map((image, index) => {
                    return (
                        <li key={index}>
                            <img className={styles.goodImg} src={image} alt="изображение товара" />
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
                    <p className={styles.description}>31 декабря 2021г</p>
                    <p className={styles.description}>1000 &#8381;</p>
                </div>

            </div>

        </div>
    )
}
