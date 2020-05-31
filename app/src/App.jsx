import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import CustomerListView from "./views/CustomerListView";
import CustomerCreateAndEditView from "./views/CustomerCreateAndEditView";

export default function App() {
  return (
    <Router>
      <Switch>
        <Redirect exact path="/" to="/customers" />
        <Route exact path="/customers">
          <CustomerListView />
        </Route>
        <Route exact path="/customers/:id">
          <CustomerCreateAndEditView />
        </Route>
      </Switch>
    </Router>
  );
}
