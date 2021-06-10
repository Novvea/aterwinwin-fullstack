import styles from './Dialog.module.css';

export const Dialog = ({ children, close }) => {
  return (
    <div className={styles.container}>
      {children}
      <button className={styles.button} onClick={close}>
        Stäng
      </button>
    </div>
  );
};
