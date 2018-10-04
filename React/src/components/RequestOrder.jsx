import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { checkAdmin } from '../redux/actions/requestActions';

class OrderButton extends Component {
  requestFilter = (url, value) => {
    switch (value) {
    case '1':
      return `${url}/approved`;
    case '2':
      return `${url}/disapproved`;
    case '3':
      return `${url}/resolved`;
    case '4':
      return `${url}/pending`;
    default:
      return `${url}`;
    }
  };

  handleChange = (e) => {
    const { link } = this.props;
    if (!checkAdmin()) {
      link(this.requestFilter('/users/requests/orderBy', e.target.value));
    } else {
      link(this.requestFilter('/requests', e.target.value));
    }
  };

  render() {
    const { title } = this.props;
    return (
      <Fragment>
        <div className="list-header">
          <h3>{title}</h3>
          <label htmlFor="filter">Sort By:</label>
          <select id="filter" name="filter" onChange={this.handleChange}>
            <option value="0">Most recent</option>
            <option value="1">Approved</option>
            <option value="2">Disapproved</option>
            <option value="3">Resolved</option>
            <option value="4">Pending</option>
          </select>
        </div>
      </Fragment>
    );
  }
}

OrderButton.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.func.isRequired,
};

export default OrderButton;
