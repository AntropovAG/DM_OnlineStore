import styles from "./loader.module.css";

export default function Loader() {
    return (
        <div>
            <div className={styles.loaderContainer}>
                <img
                    className={styles.loaderImg}
                    src="/images/logo.svg"
                    alt="загрузчик"
                ></img>
                <p className={styles.loaderText}>Загрузка...</p>
            </div>
        </div>
    );
}
