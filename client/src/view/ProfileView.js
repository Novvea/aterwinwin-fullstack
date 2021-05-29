import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import RoutingPath from '../routes/RoutingPath';
import BackendAPIService from '../shared/api/service/BackendAPIService';
import AppLayout from '../components/AppLayout/AppLayout';

export const ProfileView = () => {
  const auth = useSelector((state) => state.auth);
  const [itemAPIResponse, setItemAPIResponse] = useState([]);

  useEffect(() => {
    if (auth) {
      showMyItems();
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

  return (
    <AppLayout>
      ProfileView
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
      <ul>
        {itemAPIResponse.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
    </AppLayout>
  );
};

export default ProfileView;
