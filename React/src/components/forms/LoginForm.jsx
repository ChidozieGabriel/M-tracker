import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Loader from '../Loader';

class LoginForm extends Component {
  state = {
    user: {
      email: '',
      password: '',
    },
    errors: {},
    loading: false,
  };

  handleSubmit = (e) => {
    const { submit } = this.props;
    const { user } = this.state;
    e.preventDefault();
    this.setState({ loading: true });
    return submit(user).catch((err) => {
      this.setState({ loading: false, errors: err.response.data.errors });
    });
  };

  handleChange = (e) => {
    const { user } = this.state;
    this.setState({
      user: { ...user, [e.target.name]: e.target.value },
    });
  };

  render() {
    const {
      loading,
      errors,
      user: { email, password },
    } = this.state;
    return (
      <div className="form-wrapper">
        <h2 className="form-title">Login</h2>
        <div className="form-inner">
          <Loader loading={loading} />
          {errors &&
            errors.message && (
            <span
              id="alert-box"
              style={{ display: 'block' }}
              className="alert alert-warning"
            >
              {errors.message}
            </span>
          )}
          <form onSubmit={this.handleSubmit}>
            <div className="input-group">
              <input
                onChange={this.handleChange}
                type="email"
                id="email"
                name="email"
                value={email}
                placeholder="Enter your email"
              />
              {errors && (
                <span id="error-email" className="error">
                  {errors.email}
                </span>
              )}
            </div>
            <div className="input-group">
              <input
                onChange={this.handleChange}
                type="password"
                id="password"
                name="password"
                value={password}
                placeholder="Enter your password"
              />
              {errors && (
                <span id="error-password" className="error">
                  {errors.password}
                </span>
              )}
            </div>
            <div className="input-group">
              <input type="submit" className="btn btn-default" value="Log in" />
              <p>
                Do not have an account?&nbsp;{' '}
                <Link href="/register" to="/register">
                  Register
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

LoginForm.propTypes = {
  submit: PropTypes.func.isRequired,
};

export default LoginForm;
