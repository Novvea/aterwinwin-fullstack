import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import BackendAPIService from '../../shared/api/service/BackendAPIService';
import RoutingPath from '../../routes/RoutingPath';
import styles from './ItemCards.module.css';
import logoimage from '../../shared/images/Logo_aterwinwin_test.jpg';
import { ItsAMatchCard } from '../ItsAMatchCard/ItsAMatchCard';

export const ItemCards = () => {
  const auth = useSelector((state) => state.auth);

  const [itemAPIResponse, setItemAPIResponse] = useState();
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [itsAMatchAPIResponse, setItsAMatchAPIResponse] = useState();

  const closeMatchDialog = () => {
    console.log('bobobo');
    setItsAMatchAPIResponse(null);
  };
  //const [openItsAMatchCard, setOpenItsAMatchCard] = useState(false)

  useEffect(() => {
    if (auth.data) {
      getAllItems();
    }
  }, [auth.data]);

  const currentItem = itemAPIResponse?.[currentItemIndex];

  const getAllItems = async () => {
    try {
      const itemsResponse = await BackendAPIService.getAllItems(auth.data._id);
      setItemAPIResponse(itemsResponse.data);
      console.log('Items for the user were fetched from server');
    } catch (error) {
      console.log('errormessage: ', error);
    }
  };

  const userLikedItem = async (likedItem) => {
    setCurrentItemIndex(currentItemIndex + 1);
    try {
      const matchResponse = await BackendAPIService.userLikedItem({
        liked_item_id: likedItem._id,
        user_id: auth.data._id,
      });
      setItsAMatchAPIResponse(matchResponse.data);
    } catch (error) {
      console.log('Error while trying to like item');
    }
  };

  const userDislikedItem = async (dislikedItem) => {
    setCurrentItemIndex(currentItemIndex + 1);
    try {
      await BackendAPIService.userDislikedItem({
        id: dislikedItem._id,
        userid: auth.data._id,
      });
    } catch (error) {
      console.log('Error while trying to dislike item');
    }
  };

  return (
    <div className={styles.itemCards}>
      {auth.data && currentItem && (
        <>
          <div className={styles.card}>
            <img
              className={styles.image}
              src={currentItem.url}
              width={512}
              height={512}
              alt={currentItem.name}
            />
            <h3 className={styles.name}>{currentItem.name}</h3>
            <div className={styles.details}>{currentItem.category}</div>
          </div>
          <div className={styles.actions}>
            <p>Är du intresserad av ett byte?</p>
            <div className={styles.likeButtons}>
              <button
                className={styles.dislike}
                onClick={() => userDislikedItem(currentItem)}
              >
                Nej tack!
              </button>
              <button
                className={styles.like}
                onClick={() => userLikedItem(currentItem)}
              >
                Ja tack!
              </button>
            </div>
            <div>
              <Link className={styles.addItem} to={RoutingPath.addItemView}>
                + Lägg till objekt
              </Link>
            </div>
          </div>
        </>
      )}
      {auth?.request?.status === 'REQUEST' && <p>Laddar!!!</p>}
      {auth?.request?.status === 'SUCCESS' && auth.data && !currentItem && (
        <p>Det finns inga fler objekt :(</p>
      )}
      {auth?.request?.status === 'SUCCESS' && !auth.data && (
        <div className={styles.card}>
          <img
            className={styles.image}
            src={logoimage}
            width={512}
            height={512}
            alt="Återwinwin"
          />
          <h3 className={styles.name}>Återwinwin</h3>
          <div className={styles.details}>Logga in för att swipa och byta</div>
        </div>
      )}
      {auth.request?.status === 'FAILURE' && <p>Något gick fel :(</p>}
      {itsAMatchAPIResponse && (
        <ItsAMatchCard match={itsAMatchAPIResponse} close={closeMatchDialog} />
      )}
    </div>
  );
};

export default ItemCards;
