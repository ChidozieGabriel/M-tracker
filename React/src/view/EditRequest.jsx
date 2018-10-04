import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RequestForm from '../components/forms/RequestForm';
import AuthHeader from '../components/AuthHeader';
import Footer from '../components/Footer';
import {
  editRequestAction,
  getASingleRequest,
} from '../redux/actions/requestActions';

export class EditRequest extends Component {
  state = {
    request: [],
  };

  componentDidMount() {
    const {
      getRequest,
      match: { params },
    } = this.props;
    getRequest(params.requestID).then((result) => {
      this.setState({
        request: result,
      });
    });
  }

  handleSubmit = (data) => {
    const {
      editRequest,
      history,
      match: { params },
    } = this.props;
    return editRequest(data, params.requestID).then(() => {
      history.push(`/view/${params.requestID}`);
    });
  };

  render() {
    const {
      match: { params },
    } = this.props;
    return (
      <div>
        <AuthHeader />
        <RequestForm
          submit={this.handleSubmit}
          title="Edit Request"
          buttonName="Edit"
          params={params}
          request={this.state.request}
        />
        <Footer />
      </div>
    );
  }
}

EditRequest.propTypes = {
  editRequest: PropTypes.func.isRequired,
  getRequest: PropTypes.func.isRequired,
  match: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired,
};

export default connect(
  null,
  { editRequest: editRequestAction, getRequest: getASingleRequest },
)(EditRequest);
