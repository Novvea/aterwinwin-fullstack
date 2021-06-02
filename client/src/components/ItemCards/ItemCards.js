import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import BackendAPIService from '../../shared/api/service/BackendAPIService';
import RoutingPath from '../../routes/RoutingPath';
import styles from './ItemCards.module.css';

export const ItemCards = () => {
  const auth = useSelector((state) => state.auth);

  const [itemAPIResponse, setItemAPIResponse] = useState([]);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);

  useEffect(() => {
    if (auth) {
      showAllItems();
    }
  }, [auth]);

  const currentItem = itemAPIResponse?.[currentItemIndex];
  console.log('itemAPIResponse: ', itemAPIResponse);

  const showAllItems = async () => {
    try {
      const itemsResponse = await BackendAPIService.getAllItems(auth._id);
      setItemAPIResponse(itemsResponse.data);
      console.log('Items for the user were fetched from server');
    } catch (error) {
      console.log('errormessage: ', error);
    }
  };

  const userLikedItem = async (item) => {
    setCurrentItemIndex(currentItemIndex + 1);
    try {
      await BackendAPIService.userLikedItem({ id: item._id, userid: auth._id });
    } catch (error) {
      console.log('Error while trying to like item');
    }
  };

  const userDislikedItem = async (item) => {
    setCurrentItemIndex(currentItemIndex + 1);
    try {
      await BackendAPIService.userDislikedItem({
        id: item._id,
        userid: auth._id,
      });
    } catch (error) {
      console.log('Error while trying to dislike item');
    }
  };

  return (
    <div className={styles.itemCards}>
      {currentItem ? (
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
      ) : (
        <p>Det finns inga fler objekt :(</p>
      )}
    </div>
  );
};

export default ItemCards;
