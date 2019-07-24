import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { compose } from 'redux';
// import LoginActions from '../../Redux/LoginRedux';

const TabClosedHandler = WrappedComponent => class LoginPageContainer extends Component {
  constructor() {
    super();
    this.tabCloseHandler = null;
  }

  componentDidMount() {
    this.tabCloseHandler = window.addEventListener('beforeunload', ev => {
      ev.preventDefault();
      return (ev.returnValue = 'Are you sure you want to close?');
    });
  }

  componentWillUnmount() {
    this.tabCloseHandler = null;
  }

  render() {
    return <WrappedComponent {...this.props} />;
  }
};

// const mapDispatchToProps = dispatch => ({
//   onCloseTab: () => dispatch(LoginActions.onLogOut())
// });
// const composedWrapper = compose(
//   connect(
//     null,
//     mapDispatchToProps
//   ),
//   TabClosedHandler
// );
export default TabClosedHandler;
