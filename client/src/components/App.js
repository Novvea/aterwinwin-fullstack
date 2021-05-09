import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

const homeView = () => <h1>Homeview</h1>;
const aboutView = () => <h1>Om</h1>;
const signUpView = () => <h1>Sign Up</h1>;

function App() {
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
}

export default App;
