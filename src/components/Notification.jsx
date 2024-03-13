import styles from './notification.module.css';
import { useDispatch } from 'react-redux';
import { togglePopup } from '../redux/cartSlice';

export default function Notification() {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(togglePopup());
    }

    return (
    <div className={styles.overlay}>
        <div className={styles.container}>
            <h2 className={styles.title}>Заказ создан</h2>
            <button className={styles.button} onClick={handleClick}>Понятно</button>
        </div>
    </div>

    )
}
