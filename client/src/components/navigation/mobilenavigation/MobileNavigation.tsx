import "./MobileNavigation.css";
import { useState, useContext } from 'react'
import { HamburgerButton } from './hamburgerbutton/HamburgerButton'
import { SideBar } from './sidebar/SideBar'
import { BackDrop } from '../../backdrop/BackDrop'
import { Profile } from '../../profile/Profile'
import { UserContext } from '../../../shared/provider/UserProvider'


export const MobileNavigation = () => {
  const [openSideBar, setOpenSideBar] = useState<boolean>(false)
  const [authUserContext, setAuthUserContext] = useContext(UserContext);

  const displayNavigationOrUsername = () => {
    return authUserContext ?
      <div className="profile" >
        <Profile />
      </div>
      :
      <>
        <HamburgerButton sideBarHandler={setOpenSideBar} />
        <SideBar sideBarIsOpen={openSideBar} sideBarHandler={setOpenSideBar} />
        {!openSideBar || <BackDrop sideBarHandler={setOpenSideBar} />}
      </>
  }

  return displayNavigationOrUsername()
};



