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

  useEffect(() => {
    if (auth) {
      showMyItems();
      showItemsILiked();
    }
  }, [auth]);

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

  return (
    <AppLayout>
      <h1>ProfileView</h1>
      <ul>
        <li>
          <a href="/api/logout">
            {' '}
            <button>Logout</button>
          </a>
        </li>
        <li>
          <Link to={RoutingPath.settingsView}> Settings</Link>
        </li>
      </ul>
      <h1>Mina objekt</h1>
      <ul>
        {itemAPIResponse.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
      <h1>Saker jag gillat</h1>
      <ul>
        {likedItemAPIResponse.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
    </AppLayout>
  );
};

export default ProfileView;
