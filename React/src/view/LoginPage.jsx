import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../redux/actions/userActions';
import AuthHeader from '../components/AuthHeader';
import Footer from '../components/Footer';
import LoginForm from '../components/forms/LoginForm';

export class LoginPage extends PureComponent {
  componentWillMount() {
    const {
      token,
      history: { replace },
    } = this.props;
    if (token) {
      replace('/dashboard');
    }
  }

  submit = (details) => {
    const {
      userLogin,
      history: { push },
    } = this.props;
    return userLogin(details).then(() => push('/dashboard'));
  };

  render() {
    return (
      <Fragment>
        <AuthHeader />
        <LoginForm submit={this.submit} />
        <Footer />
      </Fragment>
    );
  }
}

LoginPage.defaultProps = {
  token: '',
};

LoginPage.propTypes = {
  token: PropTypes.string,
  userLogin: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export const mapStateToProps = state => ({
  token: state.user.token,
});

const LoginPageRedux = connect(
  mapStateToProps,
  { userLogin: login },
)(LoginPage);

export default LoginPageRedux;
