import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
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
            <a href="/auth/google">Logga in</a>
          </li>
        </ul>
        <Switch>
          <Route exact path="/">
            <p>Hem</p>
            <a href="/auth/google">Logga in</a>
          </Route>
          <Route path="/om">
            <p>Om</p>
          </Route>
          <Route path="/signup">
            <p>Skapa konto</p>
          </Route>
          <Route path="/login">
            <p>Logga in</p>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
