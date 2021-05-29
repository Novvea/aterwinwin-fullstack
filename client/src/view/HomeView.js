import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import RoutingPath from '../routes/RoutingPath';
import BackendAPIService from '../shared/api/service/BackendAPIService';

export const HomeView = () => {
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
      <h1>HomeView</h1>
      {currentItem && (
        <div>
          <p>{currentItem.name}</p>
          <img
            src={currentItem.url}
            width={512}
            height={512}
            alt={currentItem.name}
          />
          <button onClick={() => userDislikedItem(currentItem)}>
            Nej tack!
          </button>
          <button onClick={() => userLikedItem(currentItem)}>Ja tack!</button>
        </div>
      )}
      <ul>
        <li>
          <Link to={RoutingPath.addItemView}>Lägg till objekt</Link>
        </li>
      </ul>
    </div>
  );
};
