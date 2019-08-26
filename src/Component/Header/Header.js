import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { connect } from 'react-redux';
import {
  Images, flexCentering, Colors, fontSize
} from '../../Theme';
import {
  Logo, Button, Avatar, ContentWrapper
} from '../StyledComponents';
import LoginActions from '../../Redux/LoginRedux';
import history from '../../history';
import PostActions from '../../Redux/PostRedux';
import HelperActions from '../../Redux/HelperRedux';
import { NeedHelp, Settings } from './index';

const { pen, secondary, snow } = Colors.colors;

const HeaderMainContainer = styled.div`
  position:sticky;
  top:0;
  border-bottom 1px solid rgba(0,0,0,0.15);
  z-index:10;
  background:white;
  box-shadow:0px 2px 10px 0px rgba(0,0,0,0.15)
`;

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
    const { onLogOut, user } = this.props;
    const { isStudent } = user;
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

  goToNeedHelpPage = () => {
    const { user, onSaveNeedHelp } = this.props;
    const { isStudent, id } = user;
    if (isStudent) {
      const data = {
        needHelpStudentId: id
      };
      onSaveNeedHelp(data);
      history.push('/askForHelp');
    } else {
      console.log('show the notifications');
    }
  };

  goToFeed = () => {
    history.push('/messageboard');
  };

  render() {
    const { isListVisible } = this.state;
    const { user } = this.props;
    const {
      id, isStudent, groupId, username, avatar
    } = user;
    return (
      <HeaderMainContainer>
        <ContentWrapper>
          <HeaderWrapper>
            <Logo src={Images.digii5.logo} onClick={this.goToFeed} />
            <UserInfoWrapper>
              <NeedHelp goToNeedHelpPage={this.goToNeedHelpPage} />
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
              <Settings logOut={this.logOut} />
            </UserInfoWrapper>
          </HeaderWrapper>
        </ContentWrapper>
      </HeaderMainContainer>
    );
  }
}
Header.propTypes = {
  user: PropTypes.object,
  onLogOut: PropTypes.func,
  onMasterDelete: PropTypes.func
};
const mapStateToProps = state => ({
  user: state.user.user
});
const mapDispatchToProps = dispatch => ({
  onLogOut: () => dispatch(LoginActions.onLogOut()),
  onMasterDelete: value => dispatch(PostActions.onMasterDelete(value)),
  onSaveNeedHelp: value => dispatch(HelperActions.onSaveNeedHelp(value))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
