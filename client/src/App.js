import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import Login from "./pages/auth/Login";
import setAuthToken from "./utils/setAuthToken";
import store from "./redux/store/store";
import { loadUser } from "./redux/action/auth";
import DefaultLayout from "./components/Layout/DefaultLayout";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  });
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route component={DefaultLayout} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
