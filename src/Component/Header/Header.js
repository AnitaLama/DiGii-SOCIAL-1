import React, { Component } from 'react';
import styled from '@emotion/styled';
import { FiSettings } from 'react-icons/fi';
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
    return (
      <HeaderWrapper>
        <Logo src={Images.logo} />
        <UserInfoWrapper>
          <Button className="rounded">Need help</Button>
          <Name>Anita</Name>
          <User src="data:image/jpeg;base64,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" />
          <Settings>
            <FiSettings style={{ height: '50px' }} />
          </Settings>
        </UserInfoWrapper>
      </HeaderWrapper>
    );
  }
}

export default Header;
