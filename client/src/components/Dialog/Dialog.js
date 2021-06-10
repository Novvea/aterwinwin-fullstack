import styles from './Dialog.module.css';

export const Dialog = ({ children, close }) => {
  return (
    <div onClick={close} className={styles.backdrop}>
      <div className={styles.container}>
        {children}
        <button className={styles.button} onClick={close}>
          Stäng
        </button>
      </div>
    </div>
  );
};
