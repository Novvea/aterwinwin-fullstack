import './SideBar.css'
import { Link } from 'react-router-dom'
import RoutingPath from '../../../../routes/RoutingPath'

export const SideBar = (props: {sideBarIsOpen: boolean, sideBarHandler: Function}) => {

  return (
    <div className={props.sideBarIsOpen ? 'sideBarWrapper open' : 'sideBarWrapper'}>
        <Link to={RoutingPath.signUpView} onClick={() => props.sideBarHandler(false)}>Gå med</Link>
        <span>eller</span>
        <Link to={RoutingPath.logInView} onClick={() => props.sideBarHandler(false)}>logga in</Link>
        <span>eller</span>
        <Link to={RoutingPath.aboutView} onClick={() => props.sideBarHandler(false)}> få veta hur det fungerar.</Link>
    </div>
  )
}
