import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const AppHeader = () => {
  //const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  console.log('auth: ', auth);

  return (
    <header>
      <nav>
        <Link to={'/'}>LOGO</Link>
        <ul>
          {!auth && (
            <li>
              <a href="/auth/google">Login with Google</a>
            </li>
          )}
          {auth && (
            <li>
              <a href="/api/logout">Logout</a>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
