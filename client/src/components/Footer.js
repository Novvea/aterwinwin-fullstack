import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div>
      <Link to="/om"> Om Footer.js </Link>
      <Link to="/">Användarvillkor</Link>
      <Link to="/">Jobb</Link>
    </div>
  );
};

export default Footer;
