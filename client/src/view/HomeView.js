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
    async function showAllItems() {
      try {
        const itemsResponse = await BackendAPIService.getAllItems(auth._id);
        setItemAPIResponse(itemsResponse.data);
        console.log('Items for the user were fetched from server');
      } catch (error) {
        console.log('errormessage: ', error);
      }
    }
    showAllItems();
  }, [auth]);

  const currentItem = itemAPIResponse?.[currentItemIndex];
  console.log('itemAPIResponse: ', itemAPIResponse);

  const userLikedItem = () => {
    setCurrentItemIndex(currentItemIndex + 1);
  };
  const userDislikedItem = () => {
    setCurrentItemIndex(currentItemIndex + 1);
  };

  return (
    <div>
      HomeView
      {currentItem && (
        <div>
          <p>{currentItem.name}</p>
          <img
            src={currentItem.url}
            width={512}
            height={512}
            alt={currentItem.name}
          />
          <button onClick={() => userDislikedItem()}>Nej tack!</button>
          <button onClick={() => userLikedItem()}>Ja tack!</button>
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
