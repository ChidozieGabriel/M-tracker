import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NavLink from './NavLink';
import { logOut } from '../redux/actions/userActions';

const Header = ({ token, userLogOut, history }) => {
  const logout = (e) => {
    e.preventDefault();
    if (userLogOut()) {
      history.replace('/');
    }
  };
  return (
    <div>
      <header>
        <Link href="/" className="brand" to="/">
          M-Tracker
        </Link>
        <nav>
          <ul>
            <li>
              {token ? (
                <NavLink
                  icon="fa fa-sign-out"
                  onClick={logout}
                  title="Logout"
                  to="#"
                />
              ) : (
                <NavLink icon="fa fa-sign-in" title="Login" to="/login" />
              )}
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

const mapStateToProps = state => ({
  token: state.user.token,
});

Header.defaultProps = {
  token: '',
};

Header.propTypes = {
  token: PropTypes.string,
  userLogOut: PropTypes.func.isRequired,
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(
  mapStateToProps,
  { userLogOut: logOut },
)(Header);
