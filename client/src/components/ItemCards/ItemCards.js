import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import BackendAPIService from '../../shared/api/service/BackendAPIService';
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
    <div>
      {currentItem && (
        <>
          <div className={styles.card}>
            <p>{currentItem.name}</p>
            <img
              src={currentItem.url}
              width={512}
              height={512}
              alt={currentItem.name}
            />
          </div>
          <div className={styles.actions}>
            <button onClick={() => userDislikedItem(currentItem)}>
              Nej tack!
            </button>
            <button onClick={() => userLikedItem(currentItem)}>Ja tack!</button>
          </div>
        </>
      )}
    </div>
  );
};

export default ItemCards;
