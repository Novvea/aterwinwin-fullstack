import { BrowserRouter, Switch, Route } from 'react-router-dom';
import RoutingPath from './RoutingPath';
import { HomeView } from '../view/HomeView';
import { AboutView } from '../view/AboutView';
import { LoginView } from '../view/LoginView';
import { RegisterView } from '../view/RegisterView';
import { AddItemView } from '../view/AddItemView';
import { ProfileView } from '../view/ProfileView';
import { SettingsView } from '../view/SettingsView';
import { LicenseView } from '../view/LicenseView';

export const Routes = (props) => {
  const { children } = props;

  return (
    <BrowserRouter>
      {children}
      <Switch>
        <Route exact path={RoutingPath.homeView} component={HomeView} />
        <Route exact path={RoutingPath.aboutView} component={AboutView} />
        <Route exact path={RoutingPath.loginView} component={LoginView} />
        <Route exact path={RoutingPath.registerView} component={RegisterView} />
        <Route exact path={RoutingPath.addItemView} component={AddItemView} />
        <Route exact path={RoutingPath.profileView} component={ProfileView} />
        <Route exact path={RoutingPath.settingsView} component={SettingsView} />
        <Route exact path={RoutingPath.licenseView} component={LicenseView} />
        <Route component={HomeView} />{' '}
      </Switch>
    </BrowserRouter>
  );
};
