import React from 'react';
import styled from '@emotion/styled';
import { Images, centerContent } from '../../Theme';
import { BigLogo } from '../StyledComponents';

const LogoWrapper = styled.div`
  ${centerContent};
`;

const BrandLogo = () => (
  <LogoWrapper>
    <BigLogo src={Images.digii5.logo} alt="logo-of-digii-social" />
  </LogoWrapper>
);
export default BrandLogo;
