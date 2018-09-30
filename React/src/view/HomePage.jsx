import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Homepage = () => (
  <div>
    <Header />
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

export default Homepage;
