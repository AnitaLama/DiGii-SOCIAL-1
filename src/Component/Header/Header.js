import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { FiSettings } from 'react-icons/fi';
import { connect } from 'react-redux';
import {
  Images, flexCentering, Colors, fontSize
} from '../../Theme';
import {
  Logo, WhiteButton, Button, Avatar
} from '../StyledComponents';
import LoginActions from '../../Redux/LoginRedux';
import history from '../../history';
import PostActions from '../../Redux/PostRedux';

const { pen, secondary, snow } = Colors.colors;
const HeaderWrapper = styled.div`
  padding: 20px 0;
  display: grid;
  grid-template-columns: 50% 50%;
  @media (max-width: 560px) {
    grid-template-columns: auto auto;
  }
`;

const UserInfoWrapper = styled.div`
  ${flexCentering};
  justify-content: space-between;
  padding: 0 10px;
  border-radius: 6px;
`;
const Name = styled.span`
  color: ${pen};
  margin-left: 20px;
  ${fontSize(22)};
  text-transform: capitalize;
`;

const SettingsSubList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  margin-top: -10px;
  position: absolute;

  right: 0;
  background: #e9e9e9;
  z-index: 10000;
  &:before {
    content: ' ';
    position: absolute;
    right: 4px;
    top: -15px;
    border-top: none;
    border-right: 8px solid transparent;
    border-left: 8px solid transparent;
    border-bottom: 15px solid #e9e9e9;
  }
`;
const SettingsListElement = styled.li`
  padding: 10px;
  cursor: pointer;
  &:hover {
    display: block;
    background: ${pen};
    color: ${snow};
  }
`;
const Settings = styled.div`
  position: relative;
  svg {
    color: ${secondary};
    &:hover {
      cursor: pointer;
    }
  }
`;
const DiGiiIcon = styled.img`
  height: 20.91px;
`;
const AvatarWrapper = styled.div``;
class Header extends Component {
  constructor() {
    super();
    this.state = {
      isListVisible: false
    };
  }

  handleSettingsButtonClick = () => {
    const { isListVisible } = this.state;
    this.setState({ isListVisible: !isListVisible }, () => {
      console.log('clicked', isListVisible);
    });
  };

  logOut = () => {
    const { onLogOut, users } = this.props;
    const { isStudent } = users.user;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    if (isStudent) {
      history.push('/student/login');
    } else {
      history.push('/');
    }
    onLogOut();
  };

  delete = props => {
    const { onMasterDelete } = this.props;
    onMasterDelete(props);
  };

  geToNeedHelpPage = () => {
    history.push('/askForHelp');
  };

  render() {
    const { isListVisible } = this.state;
    const { users } = this.props;
    const { user } = users;
    const {
      id, isStudent, groupId, username, avatar
    } = user;
    return (
      <HeaderWrapper>
        <Logo src={Images.digii5.logo} />
        <UserInfoWrapper>
          <WhiteButton
            className="roundedShadow"
            onClick={this.geToNeedHelpPage}
          >
            Need help?
          </WhiteButton>
          <Button
            className="roundedShadow short"
            style={{ marginLeft: '20px' }}
          >
            100
            <DiGiiIcon src={Images.digii5.DiGiit} />
          </Button>
          <Name>{user.firstname}</Name>
          <AvatarWrapper
            style={{
              marginRight: '20px',
              marginLeft: '10px'
            }}
            onClick={() => {
              history.push(`/userprofile/${isStudent ? 1 : 0}/${username}`);
            }}
          >
            <Avatar avatar={avatar} height={53} />
          </AvatarWrapper>
          {/*  <UserAvatar avatar={user.avatar} height={50} /> */}
          <Settings>
            <FiSettings
              style={{ height: '50px' }}
              onClick={this.handleSettingsButtonClick}
            />
            {isListVisible && (
              <SettingsSubList>
                <SettingsListElement onClick={this.logOut}>
                  Logout
                </SettingsListElement>
                <SettingsListElement
                  onClick={() => this.delete({ isStudent, groupId, id })}
                >
                  Reset Message Board
                </SettingsListElement>
              </SettingsSubList>
            )}
          </Settings>
        </UserInfoWrapper>
      </HeaderWrapper>
    );
  }
}
Header.propTypes = {
  users: PropTypes.object,
  onLogOut: PropTypes.func,
  onMasterDelete: PropTypes.func
};
const mapStateToProps = state => ({
  users: state.user
});
const mapDispatchToProps = dispatch => ({
  onLogOut: () => dispatch(LoginActions.onLogOut()),
  onMasterDelete: value => dispatch(PostActions.onMasterDelete(value))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
