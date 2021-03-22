import "./shared/css/Global.css";
import { Navigation } from "./components/navigation/Navigation";
import { Routes } from "./routes/Routes";
import { UserProvider } from "./shared/provider/UserProvider";
import { CardProvider } from './shared/provider/CardProvider';

function App() {
  return (
    <UserProvider>
      <CardProvider>
        <Routes>
          <Navigation />
        </Routes>
      </CardProvider>  
    </UserProvider>
  );
}

export default App;
