import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import status from '../helpers/setStatus';
import Button from './Button';

const onclick = (id) => {
  if (confirm('Are you sure you want to delete this ?')) {
    console.log('here', id);
  }
};
const table = requests =>
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
          className="btn-sm btn-delete"
          title="Click to delete"
          iconName="fa-trash"
          onClick={() => onclick(request.id)}
        />
      </td>
    </tr>
  ));
const RequestTable = ({ requests }) => (
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
          <tbody id="adminRequests">{table(requests)}</tbody>
        </table>
      </div>
    </section>
  </div>
);

RequestTable.propTypes = {
  requests: PropTypes.array.isRequired,
};

export default RequestTable;
