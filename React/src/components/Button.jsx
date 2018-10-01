import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({
  to, className, title, iconName, text, onClick,
}) => (
  <div>
    <Link to={to} href={to} onClick={onClick} className={className} title={title}>
      <i className={`fa ${iconName}`} /> {text}
    </Link>
  </div>
);
export default Button;
