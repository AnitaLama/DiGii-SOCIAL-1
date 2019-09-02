import React from 'react';
import styled from '@emotion/styled';
import { Images, centerContent } from '../../Theme';
import { BigLogo } from '../StyledComponents';

const LogoWrapper = styled.div`
  ${centerContent};
`;

const BrandLogo = () => (
  <LogoWrapper>
    <BigLogo
      alt="logo-of-digii5-social"
      src={Images.digii5.mainLogo || Images.digii5.logo}
      height={161.22}
      style={{ height: '161.22px' }}
    />
  </LogoWrapper>
);
export default BrandLogo;
