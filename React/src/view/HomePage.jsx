import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Homepage = ({ history }) => (
  <div>
    <Header history={history} />
    <div className="landing-page">
      <div className="welcome">
        <h1>M-tracker</h1>
        <p>Maintenance/repairs at your convenience</p>
        <br />
        <Link href="/register" className="btn-landing" to="/register">
          Get started
        </Link>
      </div>
    </div>
    <Footer />
  </div>
);

Homepage.propTypes = {
  history: PropTypes.shape().isRequired,
};
export default Homepage;
