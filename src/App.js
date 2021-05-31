import { Route, Switch } from "react-router";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import UsersPage from "./pages/UsersPage";

function App() {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route path="/users" exact>
          <UsersPage />
        </Route>
        <Route path="/" exact>
          <HomePage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
