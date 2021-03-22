import "./Navigation.css";
import { useWindowDimensions } from '../../hooks/useWindowDimensions'
import { DesktopNavigation } from './desktopnavigation/DesktopNavigation'
import { MobileNavigation } from './mobilenavigation/MobileNavigation'
import { Link } from 'react-router-dom'
import RoutingPath from '../../routes/RoutingPath'

export const Navigation = () => {
  const { width } = useWindowDimensions()

  const displayNavigationDependingOnDevice = () => {
    return (width <= 800)
      ? <MobileNavigation />
      : <DesktopNavigation />
  }

  return (
    <div className='navigationWrapper'>
      <div className='appName'>
        <Link to={RoutingPath.homeView}>ÅTERWINWIN</Link>
        <p>Swipa och byt</p>
      </div>
      {displayNavigationDependingOnDevice()}
    </div>
  );
};
