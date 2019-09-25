import React from 'react';
import { BigLogo } from '../../StyledComponents';
import { Images } from '../../../Theme';
import { LogoWrapper, LogoContainer } from './style';

const BrandLogo = () => (
  <LogoContainer>
    <LogoWrapper>
      <BigLogo
        src={Images.digii5.mainLogo}
        alt="logo-of-digii5-social"
        height={161.22}
        style={{ height: '161.22px' }}
      />
    </LogoWrapper>
  </LogoContainer>
);
export default BrandLogo;
