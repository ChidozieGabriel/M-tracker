import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '../components/Button';
import {
  approveRequest,
  disapproveRequest,
  resolveRequest,
} from '../redux/actions/requestActions';

export class AdminButton extends Component {
  handleApprove = (id) => {
    const { approve, reload } = this.props;
    approve(id).then(() => {
      reload();
    });
  };
  handleDisapprove = (id) => {
    const { disapprove, reload } = this.props;
    disapprove(id).then(() => {
      reload();
    });
  };
  handleResolve = (id) => {
    const { resolve, reload } = this.props;
    resolve(id).then(() => {
      reload();
    });
  };

  render() {
    const { request } = this.props;
    return (
      <Fragment>
        <ul className="admin-btn">
          <li>
            <Button
              to="#"
              className={`btn btn-approve ${
                request.status === '3' || request.status === '1' ? 'disabled' : ''
              }`}
              id="Approve"
              text="Approve"
              onClick={() => this.handleApprove(request.id)}
              iconName="fa-check"
              title="Click to edit request"
            />
          </li>
          <li>
            <Button
              to="#"
              className={`btn btn-edit ${
                request.status === '2' || request.status === '3' ? 'disabled' : ''
              }`}
              text="Resolve"
              id="Resolve"
              onClick={() => this.handleResolve(request.id)}
              iconName="fa-check-box"
              title="Click to resolve"
            />
          </li>
          <li>
            <Button
              to="#"
              className={`btn btn-delete ${
                request.status === '3' || request.status === '2' ? 'disabled' : ''
              }`}
              text="Disapprove"
              id="Disapprove"
              onClick={() => this.handleDisapprove(request.id)}
              iconName="fa-times"
              title="Click to disapprove"
            />
          </li>
          <li>
            <Button
              to="/dashboard"
              className="btn btn-primary"
              text="Back"
              iconName="fa-arrow-left"
              title="Click to go back"
            />
          </li>
        </ul>
      </Fragment>
    );
  }
}

AdminButton.propTypes = {
  approve: PropTypes.func.isRequired,
  disapprove: PropTypes.func.isRequired,
  resolve: PropTypes.func.isRequired,
  reload: PropTypes.func.isRequired,
  request: PropTypes.number.isRequired,
};

export default connect(
  null,
  {
    approve: approveRequest,
    disapprove: disapproveRequest,
    resolve: resolveRequest,
  },
)(AdminButton);
