import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <div>
    <header>
      <Link href="/" className="brand" to="/">
        M-Tracker
      </Link>
    </header>
  </div>
);

export default Header;
