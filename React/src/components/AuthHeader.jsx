import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import NavLink from './NavLink';

const Header = ({ token, location }) => (
  <div>
    <header>
      <Link href="/" className="brand" to="/">
          M-Tracker
      </Link>
      {/* <nav>
        <ul>
          <li>
            {token ? (
              <NavLink icon="fa fa-sign-out" title="Logout" to="/logout" />
            ) : (
              <NavLink icon="fa fa-sign-in" title="Login" to="/login" />
            )}
          </li>
        </ul>
      </nav> */}
    </header>
  </div>
);

const mapStateToProps = state => ({
  token: state.user.token,
});

export default connect(mapStateToProps)(Header);
