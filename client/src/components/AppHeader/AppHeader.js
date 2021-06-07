import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import RoutingPath from '../../routes/RoutingPath';
import styles from './AppHeader.module.css';

export const AppHeader = () => {
  //const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <Link to={RoutingPath.homeView}>
            <h1>Återwin-win</h1>
          </Link>
        </div>
        <ul className={styles.navList}>
          {auth?.request?.status === 'SUCCESS' && !auth.data && (
            <>
              <li>
                <a href="/auth/google">Logga in</a>
              </li>
            </>
          )}
          {auth.data && (
            <>
              <li>
                <Link to={RoutingPath.addItemView}>+ Lägg till objekt</Link>
              </li>
              <li>
                <Link to={RoutingPath.profileView}>
                  <img
                    className={styles.profileImage}
                    src={auth.data.image}
                    width={96}
                    height={96}
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
