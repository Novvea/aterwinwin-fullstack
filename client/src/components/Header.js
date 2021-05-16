import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = () => {
  //const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  console.log('auth: ', auth);

  function RenderContent(props) {
    switch (props.value) {
      case null:
        return null; //BORDE FIXA DETTA!!!
      case false:
        return (
          <li>
            <a href="/auth/google">Login with Google</a>
          </li>
        );
      default:
        return (
          <li>
            <a href="/api/logout">Logout</a>
          </li>
        );
    }
  }

  return (
    <nav>
      <Link to={auth ? '/om' : '/signup'}>This is the Header</Link>
      <ul>
        <li>
          <RenderContent value={auth} />
        </li>
      </ul>
    </nav>
  );
};

export default Header;
