import React, { Component } from 'react';
import { connect } from 'react-redux';

const Page = WrappedComponent => class PageWrapper extends Component {
  render() {
    return <WrappedComponent />;
  }
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(Page);
