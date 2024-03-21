import { Link } from 'react-router-dom'
import styles from './notFound.module.css'
import { useNavigate } from 'react-router-dom'

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Ошибка 404</h1>
      <p className={styles.text}>Сожалеем, но запрашиваемая страница не найдена</p>
      <Link className={styles.link} onClick={() => navigate(-1)}>Вернуться назад</Link>
      <Link to='/products/0' className={styles.link}>Перейти к странице товаров</Link>
    </div>
  )
}
