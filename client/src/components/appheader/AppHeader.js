import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import RoutingPath from '../../routes/RoutingPath';
import styles from './AppHeader.module.css';

const AppHeader = () => {
  //const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  console.log('auth: ', auth);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <Link to={RoutingPath.homeView}>LOGO</Link>
        </div>
        <ul className={styles.navList}>
          {!auth && (
            <>
              <li>
                <Link to={RoutingPath.loginView}>Logga in</Link>
              </li>
              <li>
                <Link to={RoutingPath.registerView}>Registrera dig</Link>
              </li>
            </>
          )}
          {auth && (
            <>
              <li>
                <Link to={RoutingPath.addItemView}>Lägg till objekt</Link>
              </li>
              <li>
                <Link to={RoutingPath.profileView}>
                  <img
                    className={styles.profileImage}
                    src={'https://thispersondoesnotexist.com/image'}
                    alt={auth.googleId}
                  />
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
