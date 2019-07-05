import React, { Component } from 'react';
import history from '../../history';

const LoginPageWrapper = WrappedComponent => class LoginPageContainer extends Component {
  componentWillMount() {
    console.log('hello');
  }

  async componentDidMount() {
    const user = JSON.parse(await localStorage.getItem('user'));
    if (user) {
      history.push('/messageboard');
    }
  }

  render() {
    return <WrappedComponent {...this.props} />;
  }
};
export default LoginPageWrapper;
