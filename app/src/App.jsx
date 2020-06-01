import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import CustomerListView from "./views/CustomerListView";
import CustomerCreateAndEditCustomerView from "./views/CustomerCreateAndEditCustomerView";

export default function App() {
  return (
    <Router>
      <Switch>
        <Redirect exact path="/" to="/customers" />
        <Route exact path="/customers">
          <CustomerListView />
        </Route>
        <Route exact path="/customers/:id">
          <CustomerCreateAndEditCustomerView />
        </Route>
      </Switch>
    </Router>
  );
}
