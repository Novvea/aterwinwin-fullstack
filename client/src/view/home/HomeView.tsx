import { useEffect, useContext } from "react";
import { Link } from 'react-router-dom'
import RoutingPath from '../../routes/RoutingPath'
import styles from './HomeView.module.css'
import { ItemCards } from '../../components/itemcards/ItemCards'
import { Search } from '../../components/search/Search'
import { UserContext } from '../../shared/provider/UserProvider'
import { AddItemButton } from '../../components/additembutton/AddItemButton'

export const HomeView = () => {
  const [authUserContext] = useContext(UserContext);

  /*   const displayUsernameIfAuthenticated = () => {
      return authUserContext ? <h1>Välkommen till hemvyn {authUserContext.username}</h1> : <h1>Välkommen till hemvyn </h1>
    } */

  useEffect(() => {
    ; /* det första som sker när komponenten laddas in */
    return () => {
      /* det sista som sker när komponeneten avlägsnas*/
    };
  }, []); /* när det värdet vi sätter in i input uppdateras så körs hela useEffect om */

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.itemCardsContainer}>
          <ItemCards />
        </div>
        <div className={styles.actionsContainer}>
          <AddItemButton />
        </div>
      </div>
    </div>

  );
};
