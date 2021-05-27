import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RoutingPath from '../routes/RoutingPath';
import BackendAPIService from '../shared/api/service/BackendAPIService';

export const ProfileView = () => {
  const auth = useSelector((state) => state.auth);

  const showMyItems = async () => {
    if (auth._id) {
      console.log('we should have an owner with _id: ', auth._id);
      try {
        const itemsResponse = await BackendAPIService.getItemsByUser(auth._id);
        console.log('itemsResponsData;', itemsResponse.data);
        console.log('Item were fetched from server');
      } catch (error) {
        console.log('errormessage: ', error);
      }
    } else {
      console.log('The items could not be fetched');
    }
  };

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
    </div>
  );
};
