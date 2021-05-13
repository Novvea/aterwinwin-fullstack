import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Header = () => {
  //const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  console.log('auth: ', auth);

  return (
    <nav>
      <a>This is the Header</a>
      <ul>
        <li>
          <a>Login With Google</a>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
