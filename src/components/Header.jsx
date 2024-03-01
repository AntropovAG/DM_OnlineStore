import { NavLink } from "react-router-dom";
import styles from "./header.module.css";

export default function Header() {
    return (
        <div className={styles.container}>
            <img
                className={styles.logo}
                src="images/DM_header_logo.png"
                alt="Логотип Синий куб"
            />
            <nav className={styles.navContainer}>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? `${styles.navLink} ${styles.navLinkActive}` : `${styles.navLink} ${styles.navLinkInactive}`
                    }
                >
                    Товары
                </NavLink>
                <NavLink
                    to="/orders"
                    className={({ isActive }) =>
                        isActive ? `${styles.navLink} ${styles.navLinkActive}` : `${styles.navLink} ${styles.navLinkInactive}`
                    }
                >
                    Заказы
                </NavLink>
            </nav>
            <button className={styles.cartButton} type="button">
                <img className={styles.img} src="images/cart.png" alt="Корзина" />
                <p className={styles.text}>Корзина</p>
                <span className={styles.text}>(0)</span>
            </button>
        </div>
    );
}
