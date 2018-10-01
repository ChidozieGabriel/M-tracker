import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getAllRequests, {
  deleteRequestAction,
} from '../redux/actions/requestActions';
import HeaderDash from '../components/HeaderDash';
import Footer from '../components/Footer';
import RequestTable from '../components/RequestTable';

class Dashboard extends Component {
  state = {
    requestState: [],
    message: '',
  };
  componentDidMount() {
    const { getAllRequest } = this.props;
    return getAllRequest().then((result) => {
      this.setStateWithRequests(result);
    });
  }

  setStateWithRequests = (result) => {
    this.setState({
      ...this.state,
      requestState: result.payload,
    });
  };

  handleDelete = (id) => {
    const { deleteRequest } = this.props;
    deleteRequest(id)
      .then((res) => {
        this.setState({
          message: res.message,
        });
        const { getAllRequest } = this.props;
        return getAllRequest().then((result) => {
          this.setStateWithRequests(result);
        });
      })
      .catch((err) => {
        this.setState({
          message: err.response.data.errors.message,
        });
      });
  };

  render() {
    const { history } = this.props;
    const { requestState } = this.state;
    return (
      <div>
        <HeaderDash history={history} />
        {this.state.message && (
          <span
            id="alert-box"
            style={{ display: 'block' }}
            className="alert alert-success"
          >
            {this.state.message}
          </span>
        )}
        <RequestTable deleteRequest={this.handleDelete} requests={requestState} />
        <Footer />
      </div>
    );
  }
}

Dashboard.propTypes = {
  history: PropTypes.object.isRequired,
  getAllRequest: PropTypes.func.isRequired,
  deleteRequest: PropTypes.func.isRequired,
};

export default connect(
  null,
  {
    getAllRequest: getAllRequests,
    deleteRequest: deleteRequestAction,
  },
)(Dashboard);
