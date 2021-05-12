import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

const homeView = () => <h1>Homeview</h1>;
const aboutView = () => <h1>Om</h1>;
const signUpView = () => <h1>Sign Up</h1>;

const App = () => {
  useEffect(() => {
    actions.fetchUser();
  }, []);

  return (
    <BrowserRouter>
      <div>
        <ul>
          <li>
            <Link to="/">Hem</Link>
          </li>
          <li>
            <Link to="/om">Om</Link>
          </li>
          <li>
            <Link to="/signup">Skapa konto</Link>
          </li>
          <li>
            <a href="/auth/google">Logga in med google 1</a>
          </li>
        </ul>
        <Switch>
          <Route exact path="/" component={homeView} />
          <Route path="/om" component={aboutView} />
          <Route path="/signup" component={signUpView} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default connect(null, actions)(App);
