import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RegisterForm from '../components/forms/RegisterForm';
import AuthHeader from '../components/AuthHeader';
import Footer from '../components/Footer';
import { register } from '../redux/actions/userActions';

export class Register extends PureComponent {
  componentWillMount() {
    const {
      token,
      history: { push },
    } = this.props;
    if (token) {
      push('/dashboard');
    }
  }

  register = (details) => {
    const {
      registerUser,
      history: { push },
    } = this.props;
    return registerUser(details).then(() => push('/dashboard'));
  };

  render() {
    return (
      <Fragment>
        <AuthHeader />
        <RegisterForm submit={this.register} />
        <Footer />
      </Fragment>
    );
  }
}
Register.propTypes = {
  token: PropTypes.string.isRequired,
  registerUser: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export const mapStateToProps = state => ({
  token: state.user.token,
});

const RegisterRedux = connect(
  mapStateToProps,
  { registerUser: register },
)(Register);
export default RegisterRedux;
