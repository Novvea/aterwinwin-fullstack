import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import RoutingPath from '../routes/RoutingPath';
import BackendAPIService from '../shared/api/service/BackendAPIService';
import { modelNames } from 'mongoose';

export const ProfileView = () => {
  const auth = useSelector((state) => state.auth);
  const [itemAPIResponse, setItemAPIResponse] = useState([]);

  const showMyItems = async () => {
    if (auth._id) {
      console.log('we should have an owner with _id: ', auth._id);
      try {
        const itemsResponse = await BackendAPIService.getItemsByUser(auth._id);
        setItemAPIResponse(itemsResponse.data);
        console.log('Item were fetched from server');
      } catch (error) {
        console.log('errormessage: ', error);
      }
    } else {
      console.log('The items could not be fetched');
    }
  };

  useEffect(() => {
    console.log('apiResponse: ', itemAPIResponse);
  }, [itemAPIResponse]);

  return (
    <div>
      ProfileView
      <ul>
        <li>
          <a href="/api/logout">Logout</a>
        </li>
        <li>
          <Link to={RoutingPath.settingsView}> Settings</Link>
        </li>
      </ul>
      <button onClick={() => showMyItems()}>Visa mina upplagda objekt</button>
      <ul>
        {itemAPIResponse.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};
