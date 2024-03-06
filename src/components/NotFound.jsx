import { Link } from 'react-router-dom'
import styles from './notFound.module.css'

export default function NotFound() {
  return (
    <div className={styles.container}>
        <h1 className={styles.title}>Ошибка 404</h1>
        <p className={styles.text}>Сожалеем, но запрашиваемая страница не найдена</p>
        <Link to='/products/0' className={styles.link}>Перейти к странице товаров</Link>
    </div>
  )
}
