import React, { Component } from 'react';
import history from '../../utils/history';

const LoginPageWrapper = WrappedComponent => class LoginPageContainer extends Component {
  async componentDidMount() {
    const user = JSON.parse(await localStorage.getItem('user'));

    // console.log('session', user);
    if (user) {
      history.push('/messageboard');
    }
  }

  render() {
    return <WrappedComponent {...this.props} />;
  }
};
export default LoginPageWrapper;
