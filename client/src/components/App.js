import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUser } from '../actions';
import { Routes } from '../routes/Routes';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';

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
