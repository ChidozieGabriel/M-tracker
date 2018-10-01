import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TableBody from '../components/SingleRequestTableBody';
import Button from '../components/Button';
import { getASingleRequest } from '../redux/actions/requestActions';

class SingleView extends Component {
  state = {
    request: {},
  };

  componentDidMount() {
    const {
      match: { params },
      SingleRequest,
    } = this.props;
    SingleRequest(params.requestID).then((result) => {
      this.setState({
        request: result[0],
      });
    });
  }

  render() {
    const { request } = this.state;
    const { history } = this.props;
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
                  className="right btn btn-primary"
                  text="Edit"
                  iconName="fa-edit"
                  title="Click to edit request"
                />
                <div className="clearfix" />
              </div>
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
  history: PropTypes.shape().isRequired,
  match: PropTypes.shape({
    params: PropTypes.object.isRequired,
  }).isRequired,
};

const SingleViewWithRedux = connect(
  null,
  { SingleRequest: getASingleRequest },
)(SingleView);

export default SingleViewWithRedux;
