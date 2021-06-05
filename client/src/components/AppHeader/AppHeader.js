import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import RoutingPath from '../../routes/RoutingPath';
import styles from './AppHeader.module.css';

export const AppHeader = () => {
  const pathname = window?.location.pathname;

  //const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <Link to={RoutingPath.homeView}>LOGO</Link>
        </div>
        <ul className={styles.navList}>
          {auth.request?.[pathname] === 'SUCCESS' && !auth.data && (
            <>
              <li>
                <a href="/auth/google">Logga in</a>
              </li>
            </>
          )}
          {auth.data && (
            <>
              <li>
                <Link to={RoutingPath.addItemView}>Lägg till objekt</Link>
              </li>
              <li>
                <Link to={RoutingPath.profileView}>
                  <img
                    className={styles.profileImage}
                    src={auth.data.image}
                    alt={auth.data.displayName}
                    title={auth.data.displayName}
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
