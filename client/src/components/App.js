import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

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
          <Route exact path="/">
            <p>Hem</p>
            <a href="/auth/google">Logga in med google 2</a>
          </Route>
          <Route path="/om">
            <p>Om</p>
          </Route>
          <Route path="/signup">
            <p>Skapa konto</p>
          </Route>
          <Route path="/login">
            <p>Logga in bara vanligt</p>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
