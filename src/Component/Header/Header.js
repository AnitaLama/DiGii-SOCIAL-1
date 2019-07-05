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
  li {
    padding: 10px;
    cursor: pointer;
    &:hover {
      display: block;
      background: ${pen};
      color: ${snow};
    }
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
    const { onLogOut } = this.props;
    localStorage.removeItem('user');
    history.push('/');
    onLogOut();
  };

  render() {
    const { isListVisible } = this.state;
    const { users } = this.props;
    const { user } = users;
    return (
      <HeaderWrapper>
        <Logo src={Images.digii5.logo} />
        <UserInfoWrapper>
          <WhiteButton className="roundedShadow">Need help?</WhiteButton>
          <Button
            className="roundedShadow short"
            style={{ marginLeft: '20px' }}
          >
            100
            <DiGiiIcon src={Images.digii5.DiGiit} />
          </Button>
          <Name>{user.firstname}</Name>
          <Avatar
            src={Images.stockImage}
            height={50}
            leftMargin={10}
            rightMargin={20}
          />
          <Settings>
            <FiSettings
              style={{ height: '50px' }}
              onClick={this.handleSettingsButtonClick}
            />
            {isListVisible && (
              <SettingsSubList>
                <li onClick={this.logOut}>LOGOUT</li>
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
  onLogOut: PropTypes.func
};
const mapStateToProps = state => ({
  users: state.user
});
const mapDispatchToProps = dispatch => ({
  onLogOut: () => dispatch(LoginActions.onLogOut())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
