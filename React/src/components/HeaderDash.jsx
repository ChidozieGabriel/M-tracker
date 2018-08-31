import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as types from '../redux/types';
import { logOut } from '../redux/actions/userActions';
import NavLink from './NavLink';

const HeaderDash = ({ userLogOut, history }) => {
  const logout = () => {
    // console.log(history);
    // return userLogOut();
    return userLogOut().then(() => history.replace('/'));
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
              <NavLink icon="fa fa-plus" title="Create request" to="/add" />
            </li>
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
};

const HeaderDashWithRedux = connect(null, { userLogOut: logOut })(HeaderDash);

export default HeaderDashWithRedux;