import { BrowserRouter, Switch, Route } from 'react-route-dom';

export const Routes = (children) => {
  return (
    <BrowserRouter>
      {children}
      <Switch>
        <Route></Route>
      </Switch>
    </BrowserRouter>
  );
};
