import { BrowserRouter, Switch, Route } from "react-router-dom";
import { AboutView } from "../view/about/AboutView";
import { HomeView } from "../view/home/HomeView";
import { CategoriesView } from "../view/categories/CategoriesView";
import { LogInView } from "../view/login/LogInView";
import { SignUpView } from "../view/signup/SignUpView";
import { SettingsView } from '../view/authenticateduserviews/settingsview/SettingsView'
import { MyProfileView } from '../view/authenticateduserviews/myprofileview/MyProfileView'
import { AddItemView } from '../view/additem/AddItemView'
import RoutingPath from "./RoutingPath";
import { UserContext } from "../shared/provider/UserProvider";
import { useContext } from "react";

export const Routes = (props: { children: React.ReactChild }) => {
  const [authUserContext, setAuthUserContext] = useContext(UserContext);
  const { children } = props;

  const changeRoute = (goToView: React.FC, blockView: React.FC) => {
    return !authUserContext ? goToView : blockView
  }

  return (
    <BrowserRouter>
      {children}
      <Switch>
        <Route exact path={RoutingPath.homeView} component={HomeView} />
        <Route exact path={RoutingPath.aboutView} component={AboutView} />
        <Route exact path={RoutingPath.categoriesView} component={CategoriesView} />
        <Route exact path={RoutingPath.logInView} component={changeRoute(LogInView, HomeView)} />
        <Route exact path={RoutingPath.signUpView} component={SignUpView} />
        <Route exact path={RoutingPath.settingsView} component={changeRoute(SignUpView, SettingsView)} />
        <Route exact path={RoutingPath.myProfileView} component={changeRoute(SignUpView, MyProfileView)} />
        <Route exact path={RoutingPath.addItemView} component={AddItemView} />
        <Route component={HomeView} />{" "}
        {/* Om vi vill att homeView är den första sidan vi kommer till och om något blir fel */}
      </Switch>
    </BrowserRouter>
  );
};
