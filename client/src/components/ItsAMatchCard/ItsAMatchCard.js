import styles from './ItsAMatchCard.module.css';

export const ItsAMatchCard = (match) => {
  return (
    <div className={styles.container}>
      <h1>Its a match!!!!</h1>
      <p>Jag vill ha din</p>
      {match.itsAMatch.likedItem}
      <p>och du vill ha min</p>
      {match.itsAMatch.matches.map((item) => (
        <p>{item.name}</p>
      ))}
      <p>Ska vi byta?</p>
    </div>
  );
};
