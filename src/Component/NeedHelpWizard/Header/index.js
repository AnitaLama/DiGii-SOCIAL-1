import React from 'react';
import PropTypes from 'prop-types';
import { Images } from '../../../Theme';
import { Logo, WhiteButton } from '../../StyledComponents';
import history from '../../../utils/history';
import { HeaderWrapper, ButtonWrapper } from './style';

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

Header.propTypes = {
  goBack: PropTypes.func
};
export default Header;
