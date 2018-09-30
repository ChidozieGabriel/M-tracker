import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getAllRequests from '../redux/actions/requestActions';
import HeaderDash from '../components/HeaderDash';
import Footer from '../components/Footer';
import RequestTable from '../components/RequestTable';

class Dashboard extends Component {
  state = {
    requestState: [],
  };
  componentDidMount() {
    const { getAllRequest } = this.props;
    return getAllRequest().then((result) => {
      this.setState({
        ...this.state,
        requestState: result.payload,
      });
    });
  }

  render() {
    const { history } = this.props;
    const { requestState } = this.state;
    return (
      <div>
        <HeaderDash history={history} />
        <RequestTable requests={requestState} />
        <Footer />
      </div>
    );
  }
}

Dashboard.propTypes = {
  history: PropTypes.object.isRequired,
  getAllRequest: PropTypes.func.isRequired,
};

export default connect(
  null,
  { getAllRequest: getAllRequests },
)(Dashboard);
