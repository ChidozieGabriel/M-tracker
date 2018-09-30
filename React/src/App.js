import React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import HomePage from './view/HomePage';
import LoginPageRedux from './view/LoginPage';
import RegisterPageRedux from './view/RegisterPage';
import Dashboard from './view/Dashboard';
import AuthRoute from '../src/routes/AuthRoute';

const App = () => (
  <div>
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/login" exact component={LoginPageRedux} />
      <Route path="/register" exact component={RegisterPageRedux} />
      <AuthRoute path="/dashboard" exact component={Dashboard} />
      <Redirect path="*" to="/" />
    </Switch>
  </div>
);

export default App;
