import { Link } from 'react-router-dom';
import RoutingPath from '../../routes/RoutingPath';
import styles from './AppFooter.module.css';

export const AppFooter = () => {
  return (
    <footer>
      <nav>
        <ul className={styles.navList}>
          <li>
            <Link to={RoutingPath.aboutView}>Om</Link>
          </li>
          <li>
            <Link to={RoutingPath.licenseView}>Användarvillkor</Link>
          </li>
          {/*           <li>
            <a href="https://github.com/Novvea">Jobb</a>
          </li> */}
          <li>
            <Link to={RoutingPath.jobbView}>Jobb</Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default AppFooter;
