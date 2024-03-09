import styles from "./button.module.css";

export default function Button({ buttonName, handleClick }) {

    return (
        <button className={styles.button} onClick={handleClick}>
            {buttonName}
        </button>

    )
}
