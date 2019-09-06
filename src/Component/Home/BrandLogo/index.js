import React from 'react';
import { BigLogo } from '../../StyledComponents';
import { Images } from '../../../Theme';
import { LogoWrapper } from './style';

const BrandLogo = () => (
  <LogoWrapper>
    <BigLogo
      src={Images.digii5.mainLogo}
      alt="logo-of-digii5-social"
      height={161.22}
      style={{ height: '161.22px' }}
    />
  </LogoWrapper>
);
export default BrandLogo;
