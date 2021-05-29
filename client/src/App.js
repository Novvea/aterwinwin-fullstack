import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUser } from './actions';
import { Routes } from './routes/Routes';
import '../src/shared/css/Global.css';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <div>
      <Routes />
    </div>
  );
};

export default App;

// export default connect(null, actions)(App);
