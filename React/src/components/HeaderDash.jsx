import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logOut } from '../redux/actions/userActions';
import { checkAdmin } from '../redux/actions/requestActions';
import NavLink from './NavLink';

const HeaderDash = ({ userLogOut, history }) => {
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
            {!checkAdmin() ? (
              <li>
                <NavLink icon="fa fa-plus" title="Create request" to="/create" />
              </li>
            ) : null}
            <li>
              <NavLink
                icon="fa fa-sign-out"
                onClick={logout}
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
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }).isRequired,
};

const HeaderDashWithRedux = connect(
  null,
  { userLogOut: logOut },
)(HeaderDash);

export default HeaderDashWithRedux;
