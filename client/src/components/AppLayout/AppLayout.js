import AppHeader from '../AppHeader/AppHeader';
import AppFooter from '../AppFooter/AppFooter';
import styles from './AppLayout.module.css';

export const AppLayout = ({ children }) => (
  <div className={styles.layout}>
    <AppHeader />
    <main className={styles.content}>{children}</main>
    <AppFooter />
  </div>
);

export default AppLayout;
