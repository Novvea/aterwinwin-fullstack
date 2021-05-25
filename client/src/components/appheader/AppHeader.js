import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import RoutingPath from '../../routes/RoutingPath';

const AppHeader = () => {
  //const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  console.log('auth: ', auth);

  return (
    <header>
      <nav>
        <Link to={RoutingPath.homeView}>LOGO</Link>
        {!auth && (
          <ul>
            <li>
              <Link to={RoutingPath.loginView}>Logga in</Link>
            </li>
            <li>
              <Link to={RoutingPath.registerView}> Registrera dig</Link>
            </li>
          </ul>
        )}
        {auth && (
          <ul>
            <li>
              <Link to={RoutingPath.profileView}>
                Användare med google id: {auth.googleId}
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default AppHeader;
