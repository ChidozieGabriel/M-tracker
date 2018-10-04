import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TableBody from '../components/SingleRequestTableBody';
import Button from '../components/Button';
import AdminButton from '../components/AdminButtons';
import { getASingleRequest, getAdminRequest } from '../redux/actions/requestActions';

export class SingleView extends Component {
  state = {
    request: {},
  };

  componentDidMount() {
    const {
      match: { params },
      SingleRequest,
      SingleAdminRequest,
      admin,
    } = this.props;

    if (!admin) {
      SingleRequest(params.requestID).then((result) => {
        this.setMyState(result);
      });
    } else {
      SingleAdminRequest(params.requestID).then((result) => {
        this.setMyState(result);
      });
    }
  }

  setMyState = result =>
    this.setState({
      request: result[0],
    });

  reloadDetails = () => {
    const {
      match: { params },
      SingleAdminRequest,
    } = this.props;
    SingleAdminRequest(params.requestID).then((result) => {
      this.setMyState(result);
    });
  };

  render() {
    const { request } = this.state;
    const { history, admin } = this.props;
    return (
      <div id="error-message">
        <Header history={history} />
        <div className="wrapper">
          <div className="view-request-wrapper">
            <h3>Request Details</h3>
            <div className="card">
              <div className="table-res">
                <table className="table">
                  <TableBody request={request} />
                </table>
              </div>
              {admin ? (
                <div>
                  <AdminButton reload={this.reloadDetails} request={request} />
                </div>
              ) : (
                <div>
                  <Button
                    to="/dashboard"
                    className="left btn btn-primary"
                    text="Back"
                    iconName="fa-arrow-left"
                    title="Click to go back"
                  />
                  <Button
                    to={`/edit/${request.id}`}
                    className={`right btn btn-primary ${
                      request.status === '1' || request.status === '3'
                        ? 'disabled'
                        : ''
                    }`}
                    text="Edit"
                    iconName="fa-edit"
                    title="Click to edit request"
                  />
                </div>
              )}
              <div className="clearfix" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

SingleView.propTypes = {
  SingleRequest: PropTypes.func.isRequired,
  SingleAdminRequest: PropTypes.func.isRequired,
  admin: PropTypes.bool.isRequired,
  history: PropTypes.shape().isRequired,
  match: PropTypes.shape({
    params: PropTypes.object.isRequired,
  }).isRequired,
};

export const mapStateToProps = state => ({
  admin: state.user.auth.admin,
});

const SingleViewWithRedux = connect(
  mapStateToProps,
  {
    SingleRequest: getASingleRequest,
    SingleAdminRequest: getAdminRequest,
  },
)(SingleView);

export default SingleViewWithRedux;
