import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import RoutingPath from '../routes/RoutingPath';
import BackendAPIService from '../shared/api/service/BackendAPIService';
import AppLayout from '../components/AppLayout/AppLayout';

export const ProfileView = () => {
  const auth = useSelector((state) => state.auth);
  const [itemAPIResponse, setItemAPIResponse] = useState([]);
  const [likedItemAPIResponse, setLikedItemAPIResponse] = useState([]);
  const [thisItemIsNoLongerLiked, setThisItemIsNoLongerLiked] = useState();

  useEffect(() => {
    if (auth) {
      showMyItems();
      showItemsILiked();
    }
  }, [auth, thisItemIsNoLongerLiked]);

  const showMyItems = async () => {
    try {
      const itemsResponse = await BackendAPIService.getItemsByUser(auth._id);
      setItemAPIResponse(itemsResponse.data);
      console.log('My items were fetched from server');
    } catch (error) {
      console.log('errormessage: ', error);
    }
  };

  const showItemsILiked = async () => {
    try {
      const itemsResponse = await BackendAPIService.getLikedItemsByUser(
        auth._id
      );
      setLikedItemAPIResponse(itemsResponse.data);
    } catch (error) {
      console.log('errormessage: ', error);
    }
  };

  const removeItemsILiked = async (item) => {
    setThisItemIsNoLongerLiked(item);
    try {
      await BackendAPIService.updateUserLikedItem({
        update_item_id: item._id,
        user_id: auth._id,
      });
      console.log('I do no longer like this item');
    } catch (error) {
      console.log('errormessage: ', error);
    }
  };

  return (
    <AppLayout>
      {auth && (
        <div>
          <img
            src={auth.image}
            alt={auth.displayName}
            title={auth.displayName}
          />
          <h2>{auth.displayName}</h2>
          <a href="/api/logout">Logga ut</a>
        </div>
      )}
      <div>
        <h1>Dina matchningar</h1>
      </div>
      <div>
        <h1>Dina tillagda objekt</h1>
        <ul>
          {itemAPIResponse.map((item, index) => (
            <li key={index}>
              {item.name}
              <img src={item.url} width={100} height={100} alt={item.name} />
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h1>Objekt du gillat</h1>
        <ul>
          {likedItemAPIResponse.map((item, index) => (
            <li key={index}>
              {item.name}
              <img src={item.url} width={100} height={100} alt={item.name} />
              <button onClick={() => removeItemsILiked(item)}>Ta bort</button>
            </li>
          ))}
        </ul>
      </div>
    </AppLayout>
  );
};

export default ProfileView;
