import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUser } from './actions';
import { Routes } from './routes/Routes';
import '../src/shared/css/Global.css';
import AppHeader from './components/appheader/AppHeader';
import AppFooter from './components/appfooter/AppFooter';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <div>
      <Routes>
        <AppHeader />
        <AppFooter />
      </Routes>
    </div>
  );
};

export default App;

// export default connect(null, actions)(App);
