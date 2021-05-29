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
    async function showMyItems() {
      if (auth._id) {
        try {
          const itemsResponse = await BackendAPIService.getItemsByUser(
            auth._id
          );
          setItemAPIResponse(itemsResponse.data);
          console.log('My items were fetched from server');
        } catch (error) {
          console.log('errormessage: ', error);
        }
      } else {
        console.log('The items could not be fetched');
      }
    }
    showMyItems();
  }, []);

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
