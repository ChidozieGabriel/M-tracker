import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import decode from 'jwt-decode';

const AdminRoute = ({ component: Component, token, ...otherProps }) => {
  if (token) {
    const { admin } = decode(token);
    return (
      <Route
        {...otherProps}
        render={props =>
          (admin ? <Component {...props} /> : <Redirect to="/login" />)
        }
      />
    );
  }
  return <Redirect to="/login" />;
};

AdminRoute.propTypes = {
  component: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  token: state.user.token,
});

export default connect(mapStateToProps)(AdminRoute);
