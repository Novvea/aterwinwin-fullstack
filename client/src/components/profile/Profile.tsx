import "./Profile.css";
import { useContext } from "react";
import { UserContext } from "../../shared/provider/UserProvider";
import { ProfileDropDown } from "./profiledropdown/ProfileDropDown";

export const Profile = () => {
  const [authUserContext] = useContext(UserContext);

  return (
    <div className="profileWrapper">
      <img
        className="profileImg"
        src={"https://thispersondoesnotexist.com/image"}
        alt={"Profilepicture"}
      />
      <div className="profileName">
        {authUserContext.firstname}
      </div>
      <ProfileDropDown />
    </div>
  );
};
