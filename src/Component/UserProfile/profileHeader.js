import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProfileActions from '../../Redux/ProfileRedux';
import { Button } from '../StyledComponents';
import Avatar from './Avatar';

class UserProfileComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: props.username,
      isProfileOfAStudent: props.isProfileOfAUser,
      showAvatarOptions: false
    };
  }

  componentWillMount() {
    const { profile, isProfileOfAStudent } = this.state;
    this.props.onGetUserInfo({
      isStudent: isProfileOfAStudent,
      username: profile
    });
  }

  showAvatarOptions = () => {
    this.setState({ showAvatarOptions: !this.state.showAvatarOptions });
  };

  render() {
    const { profiles } = this.props;
    const { showAvatarOptions } = this.state;
    const { profile } = profiles;
    if (profile && profile.user_profile) {
      const { user_profile, userEmail } = profile;
      const { up_firstname, up_lastname } = user_profile;
      return (
        <div>
          <div>
            {up_firstname}
            {' '}
            {up_lastname}
          </div>
          <div>{userEmail}</div>
          <Button onClick={this.showAvatarOptions}>Create your avatar</Button>
          {showAvatarOptions && <Avatar />}
        </div>
      );
    }
    if (profile) {
      const { studentFirstname, st_lastname, studentUsername } = profile;
      return (
        <div>
          <div>
            {studentFirstname}
            {' '}
            {st_lastname}
          </div>
          <div>{studentUsername}</div>
          <Button onClick={this.showAvatarOptions}>Create your avatar</Button>
          {showAvatarOptions && <Avatar />}
        </div>
      );
    }
    return <div>LOADING...</div>;
  }
}

const mapStateToProps = state => ({
  profiles: state.profile
});
const mapDispatchToProps = dispatch => ({
  onGetUserInfo: value => dispatch(ProfileActions.onGetUserInfo(value))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfileComponent);
