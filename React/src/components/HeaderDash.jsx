import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logOut } from '../redux/actions/userActions';
import NavLink from './NavLink';

export const HeaderDash = ({ userLogOut, history, admin }) => {
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
            {!admin ? (
              <li>
                <NavLink icon="fa fa-plus" title="Create request" to="/create" />
              </li>
            ) : null}
            <li>
              <NavLink
                icon="fa fa-sign-out"
                onClick={logout}
                id="logout"
                title="Logout"
                to="#"
              />
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

HeaderDash.propTypes = {
  userLogOut: PropTypes.func.isRequired,
  admin: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }).isRequired,
};

export const mapStateToProps = state => ({
  admin: state.user.auth.admin,
});

const HeaderDashWithRedux = connect(
  mapStateToProps,
  { userLogOut: logOut },
)(HeaderDash);

export default HeaderDashWithRedux;
