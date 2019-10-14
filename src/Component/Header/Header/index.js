import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  Logo, Button, Avatar, ContentWrapper
} from '../../StyledComponents';
import LoginActions from '../../../Redux/LoginRedux';
import StrikeActions from '../../../Redux/StrikeRedux';
import history from '../../../utils/history';
import PostActions from '../../../Redux/PostRedux';
import HelperActions from '../../../Redux/HelperRedux';
import { NeedHelp, Settings } from '../index';
import {
  HeaderMainContainer,
  HeaderWrapper,
  UserInfoWrapper,
  Name,
  DiGiiIcon,
  AvatarWrapper
} from './style';
import { Images } from '../../../Theme';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      isListVisible: false
    };
  }

  // componentWillMount() {
  //   const {} = this.props;
  // }

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
    localStorage.removeItem('isFirstTimeAskingHelp');
    localStorage.removeItem('isFirstTimeAskingHelpFor');
    localStorage.removeItem('isFirstTimeAskingHelpWhen');
    if (isStudent) {
      history.push('/student/login');
    } else {
      history.push('/');
    }
    onLogOut();
  };

  onDelete = props => {
    const { onMasterDelete, resetStrikes } = this.props;
    Object.keys(localStorage).map(item => {
      // console.log(
      //   'localStorage item',
      //   item,
      //   item.includes('FirstTimeAskingHelp')
      // );
      if (item.includes('FirstTimeAskingHelp')) {
        // console.log('yes');
        localStorage.removeItem(item);
      }
      return true;
    });
    // console.log('localStorage', Object.keys(localStorage));
    onMasterDelete(props);
    resetStrikes();
  };

  goToNeedHelpPage = () => {
    const { user, onSaveNeedHelp } = this.props;
    const { isStudent, id, groupId } = user;
    if (isStudent) {
      // if (isFirstTimeAskingHelp) {
      //   onDisableFirstTimeAskingHelp();
      // }
      const data = {
        needHelpStudentId: id,
        stGroupId: groupId
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
    const { user } = this.props;
    const { isStudent, username, avatar } = user;
    return (
      <HeaderMainContainer>
        <ContentWrapper>
          <HeaderWrapper>
            <Logo src={Images.digii5.logo} onClick={this.goToFeed} />
            <UserInfoWrapper>
              <NeedHelp goToNeedHelpPage={this.goToNeedHelpPage} />
              <Button
                className="roundedShadow default"
                style={{ marginLeft: '20px', minWidth: '100px' }}
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
              <Settings logOut={this.logOut} onDelete={this.onDelete} />
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
  // onEnableFirstTimePosting: () => dispatch(LoginActions.onEnableFirstTimePosting()),
  onMasterDelete: value => dispatch(PostActions.onMasterDelete(value)),
  onSaveNeedHelp: value => dispatch(HelperActions.onSaveNeedHelp(value)),
  resetStrikes: () => dispatch(StrikeActions.resetStrikes())
  // onDisableFirstTimeAskingHelp: () => dispatch(LoginActions.onDisableFirstTimeAskingHelp())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
