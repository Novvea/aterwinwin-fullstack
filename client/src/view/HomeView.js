import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import RoutingPath from '../routes/RoutingPath';
import BackendAPIService from '../shared/api/service/BackendAPIService';

export const HomeView = () => {
  const auth = useSelector((state) => state.auth);
  const [itemAPIResponse, setItemAPIResponse] = useState([]);

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

  return (
    <div>
      HomeView
      <ul>
        {itemAPIResponse.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
      <ul>
        <li>
          <Link to={RoutingPath.addItemView}>Lägg till objekt</Link>
        </li>
      </ul>
    </div>
  );
};
