import { NavLink, useLocation } from "react-router-dom";
import Cart from "../Cart/Cart";
import styles from "./header.module.css";

export default function Header() {
    const location = useLocation();

    return (
        <div className={styles.container}>
            <img
                className={styles.logo}
                src="/images/DM_header_logo.png"
                alt="Логотип Синий куб"
            />
            <nav className={styles.navContainer}>
                <NavLink
                    to={"/"}
                    className={location.pathname.startsWith(`/products`) || location.pathname.startsWith(`/product`) ? `${styles.navLink} ${styles.navLinkActive}` : `${styles.navLink} ${styles.navLinkInactive}`
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
            <div className={styles.cartContainer}>
                <Cart />
            </div>
        </div>
    );
}
