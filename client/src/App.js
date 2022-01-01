import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import Login from "./pages/auth/Login";
import setAuthToken from "./utils/setAuthToken";
import store from "./redux/store/store";
import { loadUser } from "./redux/action/auth";
import DefaultLayout from "./components/Layout/DefaultLayout";
import Invoice from "./components/Invoice/Invoice";
import Laporan from "./components/Laporan/Laporan";

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
          <Route path="/" exact render={() => <Redirect to="/login" />} />
          <Route path="/login"  component={Login} />
          <Route path="/invoice/:id/:id_transaction" component={Invoice} />
          <Route path="/laporan" component={Laporan} />
          <Route component={DefaultLayout} />
          
        </Switch>
      </div>
    </Router>
  );
};

export default App;
