import styles from "./button.module.css";

export default function Button({ buttonName, handleClick, disabled }) {

    return (
        <button className={styles.button} onClick={handleClick} disabled={disabled ? disabled : false}>
            {buttonName}
        </button>
    )
}
