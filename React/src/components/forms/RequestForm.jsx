import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import Loader from '../Loader';

class RequestForm extends Component {
  state = {
    data: {
      dept: '',
      request: '',
    },
    errors: {},
    loading: false,
    message: '',
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { submit } = this.props;
    this.setState({
      loading: true,
    });
    return submit(this.state.data)
      .then((response) => {
        this.setState({
          loading: false,
          message: response.message,
          data: {
            dept: '',
            request: '',
          },
        });
      })
      .catch((error) => {
        this.setState({
          loading: false,
          errors: error.response.data.errors,
        });
      });
  };

  handleChange = (e) => {
    const { data } = this.state;
    this.setState({
      data: {
        ...data,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    const {
      errors,
      message,
      loading,
      data: { dept, request },
    } = this.state;
    return (
      <div className="form-wrapper ">
        <h3>Create Request</h3>
        <div className="form-inner card">
          <Loader loading={loading} />
          {message && (
            <span
              id="alert-box"
              style={{ display: 'block' }}
              className="alert alert-success"
            >
              {message}
            </span>
          )}
          <form onSubmit={this.handleSubmit}>
            <div className="input-group">
              <input
                onChange={this.handleChange}
                type="text"
                id="dept"
                name="dept"
                value={dept}
                placeholder="Enter your department"
              />
              {errors && (
                <span id="error-email" className="error">
                  {errors.dept}
                </span>
              )}
            </div>
            <div className="input-group">
              <textarea
                onChange={this.handleChange}
                rows="5"
                id="request"
                name="request"
                value={request}
                placeholder="Write the details of the request"
              />
              {errors && (
                <span id="error-password" className="error">
                  {errors.request}
                </span>
              )}
            </div>
            <div className="input-group">
              <div>
                <Button
                  to="/dashboard"
                  className="btn btn-primary left"
                  text="Back"
                  iconName="fa-arrow-left"
                  title="Click to go back"
                />
                <input
                  type="submit"
                  className="btn btn-primary right"
                  value="Create"
                />
                <div className="clearfix" />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

RequestForm.propTypes = {
  submit: PropTypes.func.isRequired,
};

export default RequestForm;
