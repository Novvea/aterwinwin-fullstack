import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RoutingPath from '../routes/RoutingPath';
import AppLayout from '../components/AppLayout/AppLayout';
import ItemCards from '../components/ItemCards/ItemCards';

export const HomeView = () => {
  return (
    <AppLayout>
      <ItemCards />
      <ul>
        <li>
          <Link to={RoutingPath.addItemView}>Lägg till objekt</Link>
        </li>
      </ul>
    </AppLayout>
  );
};

export default HomeView;
