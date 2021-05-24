import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUser } from '../actions';
import AppHeader from './AppHeader';
import { Routes } from '../routes/Routes';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <div>
      <Routes>
        <AppHeader />
      </Routes>
    </div>
  );
};

export default App;

// export default connect(null, actions)(App);
