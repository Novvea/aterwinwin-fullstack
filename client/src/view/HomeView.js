import { Link } from 'react-router-dom';
import RoutingPath from '../routes/RoutingPath';

export const HomeView = () => {
  return (
    <div>
      HomeView
      <ul>
        <li>
          <Link to={RoutingPath.addItemView}>Lägg till objekt</Link>
        </li>
      </ul>
    </div>
  );
};
