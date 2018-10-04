import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getAllRequests, {
  deleteRequestAction,
  getAllAdminRequests,
  getAllRequestsByOrder,
} from '../redux/actions/requestActions';
import HeaderDash from '../components/HeaderDash';
import Footer from '../components/Footer';
import RequestTable from '../components/RequestTable';

export class Dashboard extends Component {
  state = {
    requests: [],
    message: '',
  };
  componentDidMount() {
    const { getAllRequest, adminRequests, admin } = this.props;
    if (!admin) {
      return getAllRequest().then((result) => {
        this.setStateWithRequests(result);
      });
    }
    return adminRequests().then((result) => {
      this.setStateWithRequests(result);
    });
  }

  setStateWithRequests = (result) => {
    this.setState({
      ...this.state,
      requests: result.payload,
    });
  };

  handleDelete = (id) => {
    const { deleteRequest, getAllRequest } = this.props;
    deleteRequest(id)
      .then((res) => {
        this.setState({
          message: res.message,
        });
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
  requestLink = (link) => {
    const { orderBy } = this.props;
    orderBy(link).then((result) => {
      this.setStateWithRequests(result);
    });
  };

  render() {
    const { history } = this.props;
    const { requests } = this.state;
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
        <RequestTable
          link={this.requestLink}
          deleteRequest={this.handleDelete}
          requests={requests}
        />
        <Footer />
      </div>
    );
  }
}

Dashboard.propTypes = {
  history: PropTypes.object.isRequired,
  getAllRequest: PropTypes.func.isRequired,
  deleteRequest: PropTypes.func.isRequired,
  adminRequests: PropTypes.func.isRequired,
  admin: PropTypes.bool.isRequired,
  orderBy: PropTypes.func.isRequired,
};

export const mapStateToProps = state => ({
  admin: state.user.auth.admin,
});

export default connect(
  mapStateToProps,
  {
    getAllRequest: getAllRequests,
    deleteRequest: deleteRequestAction,
    adminRequests: getAllAdminRequests,
    orderBy: getAllRequestsByOrder,
  },
)(Dashboard);
