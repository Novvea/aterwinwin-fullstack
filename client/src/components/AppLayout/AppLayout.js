import AppHeader from '../AppHeader/AppHeader';
import AppFooter from '../AppFooter/AppFooter';
import styles from './AppLayout.module.css';

const AppLayout = ({ children }) => (
  <div>
    <AppHeader />
    <main className={styles.mainContent}>{children}</main>
    <AppFooter />
  </div>
);
export default AppLayout;
