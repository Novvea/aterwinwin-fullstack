import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import RoutingPath from '../../routes/RoutingPath';
import styles from './AppHeader.module.css';

export const AppHeader = () => {
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
                <a href="/auth/google">Logga in</a>
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
                    src={auth.image}
                    alt={auth.displayName}
                    title={auth.displayName}
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
