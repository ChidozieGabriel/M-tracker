import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import status from '../helpers/setStatus';
import Button from './Button';
import OrderBy from './RequestOrder';

export class RequestTable extends Component {
  handleOnClick = (id) => {
    const { deleteRequest } = this.props;
    return window.confirm('Are you sure about this ?') ? deleteRequest(id) : null;
  };

  table = requests =>
    requests.map((request, i) => (
      <tr key={request.id}>
        <td>{i + 1}</td>
        <td>{request.requester_name}</td>
        <td className={status(request.status)}>
          <small>{status(request.status).toUpperCase()}</small>
        </td>
        <td>{moment(request.date).fromNow()}</td>
        <td className="action-btn">
          <Button
            to={`/view/${request.id}`}
            className="btn-sm btn-primary"
            title="Click to view request"
            iconName="fa-eye"
          />
          <Button
            to="#"
            className={`btn-sm btn-delete ${
              request.status === '3' || request.status === '1' ? 'disabled' : ''
            }`}
            title="Click to delete"
            iconName="fa-trash"
            id="delete"
            onClick={() => this.handleOnClick(request.id)}
          />
        </td>
      </tr>
    ));

  AdminTable = requests =>
    requests.map((request, i) => (
      <tr key={request.id}>
        <td>{i + 1}</td>
        <td>{request.requester_name}</td>
        <td className={status(request.status)}>
          <small>{status(request.status).toUpperCase()}</small>
        </td>
        <td>{moment(request.date).fromNow()}</td>
        <td className="action-btn">
          <Button
            to={`/view/${request.id}`}
            className="btn-sm btn-primary"
            title="Click to view request"
            iconName="fa-eye"
          />
        </td>
      </tr>
    ));

  render() {
    const { requests, link, admin } = this.props;
    return (
      <div className="wrapper">
        <section className="list">
          <OrderBy title="All requests" link={link} />
          <div className="table-res">
            <table className="table">
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              {requests.length > 0 ? (
                <tbody id="adminRequests">
                  {admin ? this.AdminTable(requests) : this.table(requests)}
                </tbody>
              ) : (
                <h3>No requests yet</h3>
              )}
            </table>
          </div>
        </section>
      </div>
    );
  }
}
RequestTable.propTypes = {
  requests: PropTypes.array.isRequired,
  deleteRequest: PropTypes.func.isRequired,
  link: PropTypes.func.isRequired,
  admin: PropTypes.bool.isRequired,
};

export const mapStateToProps = state => ({
  admin: state.user.auth.admin,
});

export default connect(mapStateToProps)(RequestTable);
