import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { FiSettings } from 'react-icons/fi';
import { connect } from 'react-redux';
import { Images, flexCentering, Colors } from '../../Theme';
import { Logo, Button } from '../StyledComponents';

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
  background: ${Colors.colors.snow};
  padding: 0 10px;
  border-radius: 6px;
`;
const Name = styled.span`
  color: ${Colors.colors.pen};
  margin-left: 20px;
`;
const User = styled.img`
  height: 50px;
  border-radius: 32px;
  margin-right: 20px;
  margin-left: 10px;
`;
const Settings = styled.div`
  color: ${Colors.colors.pencil};
`;
class Header extends Component {
  render() {
    const { users } = this.props;
    const { user } = users;

    return (
      <HeaderWrapper>
        <Logo src={Images.logo} />
        <UserInfoWrapper>
          <Button className="rounded">Need help</Button>
          <Name>{user.firstName}</Name>
          <User src={Images.stockImage} />
          <Settings>
            <FiSettings style={{ height: '50px' }} />
          </Settings>
        </UserInfoWrapper>
      </HeaderWrapper>
    );
  }
}
Header.propTypes = {
  users: PropTypes.object
};
const mapStateToProps = state => ({
  users: state.user
});
export default connect(mapStateToProps)(Header);
