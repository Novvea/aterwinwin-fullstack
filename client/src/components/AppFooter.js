import { Link } from 'react-router-dom';
import RoutingPath from '../routes/RoutingPath';

const Footer = () => {
  return (
    <footer>
      <Link to={RoutingPath.aboutView}> Om </Link>
      <Link to={RoutingPath.licenseView}>Användarvillkor</Link>
      <a href="https://github.com/Novvea">Jobb</a>
    </footer>
  );
};

export default Footer;
