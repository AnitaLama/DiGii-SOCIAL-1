import React from 'react';
import styled from '@emotion/styled';
import { Images, centerContent } from '../../Theme';

const LogoWrapper = styled.div`
  ${centerContent};
`;

const BrandLogo = () => (
  <LogoWrapper>
    <img src={Images.logo} width="100%" alt="logo-of-digii-social" />
  </LogoWrapper>
);
export default BrandLogo;
