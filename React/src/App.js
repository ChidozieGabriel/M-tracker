import React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import HomePage from './view/HomePage';
import LoginPageRedux from './view/LoginPage';
import CreateRequest from './view/CreateRequest';
import EditRequest from './view/EditRequest';
import RegisterPageRedux from './view/RegisterPage';
import Dashboard from './view/Dashboard';
import SingleRequest from './view/SingleRequest';
import AuthRoute from '../src/routes/AuthRoute';

const App = () => (
  <div>
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/login" exact component={LoginPageRedux} />
      <Route path="/register" exact component={RegisterPageRedux} />
      <AuthRoute path="/dashboard" exact component={Dashboard} />
      <AuthRoute path="/view/:requestID" exact component={SingleRequest} />
      <AuthRoute path="/create" exact component={CreateRequest} />
      <AuthRoute path="/edit/:requestID" exact component={EditRequest} />
      <Redirect path="*" to="/" />
    </Switch>
  </div>
);

export default App;
