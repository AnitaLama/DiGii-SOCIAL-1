import React from 'react';
import styled from '@emotion/styled';
import { Images } from '../../Theme';
import { Logo, WhiteButton } from '../StyledComponents';
import history from '../../history';

const HeaderWrapper = styled.div`
  padding: 20px 0;
  display: grid;
  grid-template-columns: 50% 50%;
`;
const ButtonWrapper = styled.div`
  text-align: right;
`;
const Header = props => {
  const { goBack } = props;
  const goToFeed = () => {
    history.push('/messageboard');
  };
  return (
    <HeaderWrapper>
      <Logo src={Images.digii5.logo} onClick={goToFeed} />
      <ButtonWrapper>
        <WhiteButton className="roundedShadow short" onClick={goBack}>
          Back
        </WhiteButton>
      </ButtonWrapper>
    </HeaderWrapper>
  );
};

export default Header;
