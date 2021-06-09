import styles from './ItsAMatchCard.module.css';

export const ItsAMatchCard = ({ match, close }) => {
  return (
    <div className={styles.container}>
      <h1>Its a match!!!!</h1>
      <p>Jag vill ha din</p>
      {match.likedItem}
      <p>och du vill ha min</p>
      {match.matches.map((item) => (
        <p>{item.name}</p>
      ))}
      <button onClick={close}>Stäng</button>
    </div>
  );
};
