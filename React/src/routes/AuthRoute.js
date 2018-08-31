import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const AuthRoute = ({ component: Component, token, ...otherProps }) => (
  <Route
    {...otherProps}
    render={props => (token ? <Component {...props} /> : <Redirect to="/login" />)}
  />
);

AuthRoute.propTypes = {
  component: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  token: state.user.token,
});

export default connect(mapStateToProps)(AuthRoute);
