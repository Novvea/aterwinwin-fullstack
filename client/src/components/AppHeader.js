import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = () => {
  //const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  console.log('auth: ', auth);

  return (
    <nav>
      <Link to={auth ? '/om' : '/signup'}>This is the Header</Link>
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
  );
};

export default Header;
