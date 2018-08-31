import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const NavLink = ({
  title, onClick, to, icon,
}) => (
  <Link href={to} onClick={onClick} className="btn btn-default" to={to}>
    <i className={icon} /> {title}
  </Link>
);

NavLink.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

NavLink.defaultProps = {
  icon: undefined,
  onClick: undefined,
};

export default NavLink;
