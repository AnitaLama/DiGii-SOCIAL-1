import React, { Component } from 'react';
import {
  ContainerWrapper,
  ContentWrapper
} from '../../Component/StyledComponents';
import { UserProfileComponent } from '../../Component/UserProfile';
import history from '../../history';

class UserProfile extends Component {
  constructor() {
    super();
    this.state = {
      username: null,
      isProfileOfAUser: null
    };
  }

  componentWillMount() {
    const { user, isStudent } = this.props.match.params;
    this.setState({ username: user, isProfileOfAUser: isStudent });
  }

  render() {
    const { username, isProfileOfAUser } = this.state;
    return (
      <ContainerWrapper>
        <ContentWrapper>
          <UserProfileComponent
            username={username}
            isProfileOfAUser={isProfileOfAUser}
          />
        </ContentWrapper>
      </ContainerWrapper>
    );
  }
}

export default UserProfile;
