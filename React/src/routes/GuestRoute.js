import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const GuestRoute = ({
  component: Component,
  location: { pathname },
  token,
  ...otherProps
}) => {
  console.log('location', pathname);
  return (
    <Route
      {...otherProps}
      render={props =>
        (!token ? <Component {...props} /> : <Redirect to={pathname} />)
      }
    />
  );
};

GuestRoute.propTypes = {
  component: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  token: state.user.token,
});
export default connect(mapStateToProps)(GuestRoute);
