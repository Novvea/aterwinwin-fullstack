import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUser } from '../actions';
import Header from './AppHeader';

const homeView = () => <h1>Homeview</h1>;
const aboutView = () => <h1>Om</h1>;
const signUpView = () => <h1>Sign Up</h1>;

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Header />
          <Route exact path="/" component={homeView} />
          <Route path="/om" component={aboutView} />
          <Route path="/signup" component={signUpView} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;

// export default connect(null, actions)(App);
