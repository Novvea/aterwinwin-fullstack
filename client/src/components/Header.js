import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
            <a>Logout</a>
          </li>
        );
    }
  }

  return (
    <nav>
      <a>This is the Header</a>
      <ul>
        <li>
          {/* <a>Login With Google</a> */}
          <RenderContent value={auth} />
        </li>
      </ul>
    </nav>
  );
};

export default Header;
