import { Link } from 'react-router-dom';
import RoutingPath from '../routes/RoutingPath';

export const ProfileView = () => {
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
    </div>
  );
};
