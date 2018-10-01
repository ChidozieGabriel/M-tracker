import React, { Component } from 'react';
import { connect } from 'react-redux';
import RequestForm from '../components/forms/RequestForm';
import AuthHeader from '../components/AuthHeader';
import Footer from '../components/Footer';
import { createRequestAction } from '../redux/actions/requestActions';

class CreateRequest extends Component {
  state = {};

  handleSubmit = (data) => {
    const { createRequest } = this.props;
    return createRequest(data);
  };
  render() {
    return (
      <div>
        <AuthHeader />
        <RequestForm submit={this.handleSubmit} />
        <Footer />
      </div>
    );
  }
}

export default connect(
  null,
  { createRequest: createRequestAction },
)(CreateRequest);
