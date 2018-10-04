import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import status from '../helpers/setStatus';
import Button from './Button';
import { checkAdmin } from '../redux/actions/requestActions';

class RequestTable extends Component {
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
    const { requests } = this.props;
    return (
      <div className="wrapper">
        <section className="list">
          <div className="list-header">
            <h3>All requests</h3>
            <label htmlFor="filter">Order By:</label>
            <select id="filter" name="filter">
              <option value="0">Most recent</option>
              <option value="1">Approved</option>
              <option value="2">Disapproved</option>
              <option value="3">Resolved</option>
              <option value="4">Pending</option>
            </select>
          </div>

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
                  {checkAdmin() ? this.AdminTable(requests) : this.table(requests)}
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
};

export default RequestTable;
