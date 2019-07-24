import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserAction from '../../Redux/UserRedux';

class UserProfileComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: props.username,
      isProfileOfAUser: props.isProfileOfAUser
    };
  }

  componentWillMount() {
    console.log(this.state.profile, this.state.isProfileOfAUser);
  }

  render() {
    return <div>user</div>;
  }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
  onGetUserInfo: value => dispatch(UserAction.onGetUserInfo(value))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfileComponent);
