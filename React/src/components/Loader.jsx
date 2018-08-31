import React from 'react';
import PropTypes from 'prop-types';

import loaderGif from '../assets/Bars.gif';

const Loader = ({ loading }) => {
  if (loading) {
    return (
      <div className="loader">
        <img src={loaderGif} width="50" alt="loading" />
      </div>
    );
  }
  return null;
};

Loader.propTypes = {
  loading: PropTypes.bool,
};
Loader.defaultProps = {
  loading: false,
};

export default Loader;
