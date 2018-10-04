import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RequestForm from '../components/forms/RequestForm';
import AuthHeader from '../components/AuthHeader';
import Footer from '../components/Footer';
import { createRequestAction } from '../redux/actions/requestActions';

export class CreateRequest extends Component {
  handleSubmit = (data) => {
    const { createRequest } = this.props;
    return createRequest(data);
  };
  render() {
    return (
      <div>
        <AuthHeader />
        <RequestForm
          submit={this.handleSubmit}
          buttonName="Create"
          title="Create Request"
        />
        <Footer />
      </div>
    );
  }
}

CreateRequest.propTypes = {
  createRequest: PropTypes.func.isRequired,
};

export default connect(
  null,
  { createRequest: createRequestAction },
)(CreateRequest);
