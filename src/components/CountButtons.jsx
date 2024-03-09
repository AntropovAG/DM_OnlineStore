import styles from './countButtons.module.css';

export default function CountButtons({ decrement, increment, count }) {
    return (
        <div className={styles.countContainer}>
            <button
                className={styles.countButton}
                onClick={decrement}
                disabled={count === 0}
            >
                -
            </button>
            <span className={styles.countText}>{count}</span>
            <button
                className={styles.countButton}
                onClick={increment}
                disabled={count === 10}
            >
                +
            </button>
        </div>
    )
}
