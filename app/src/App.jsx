import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import CustomerListView from "./views/CustomerListView";
import CustomerCreateAndEditCustomerView from "./views/CustomerCreateAndEditCustomerView";
import Http404Page from "./views/Http404Page";

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
        <Route path="/http404">
          <Http404Page />
        </Route>
      </Switch>
    </Router>
  );
}
