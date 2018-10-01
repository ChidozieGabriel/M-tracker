import React, { Fragment } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import status from '../helpers/setStatus';

const TableBody = ({ request }) => (
  <Fragment>
    <tbody>
      <tr>
        <td>
          <i>Created&nbsp;by:</i>
        </td>
        <td>{request.requester_name}</td>
      </tr>
      <tr>
        <td>
          <i>Email:</i>
        </td>
        <td>{request.requester_email}</td>
      </tr>
      <tr>
        <td>
          <i>Date&nbsp;created:</i>
        </td>
        <td>{moment(request.date).fromNow()}</td>
      </tr>
      <tr>
        <td>
          <i>Department:</i>
        </td>
        <td>{request.dept}</td>
      </tr>
      <tr>
        <td>
          <i>Status:</i>
        </td>
        <td className={status(request.status)}>{status(request.status)}</td>
      </tr>
      <tr>
        <td>
          <i>Request:</i>
        </td>
        <td>
          <p>{request.request}</p>
        </td>
      </tr>
    </tbody>
  </Fragment>
);

TableBody.propTypes = {
  request: PropTypes.object.isRequired,
};

export default TableBody;
