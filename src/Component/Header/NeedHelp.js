import React, { Component } from 'react';
import styled from '@emotion/styled';
import { WhiteButton } from '../StyledComponents';
import { listArrowTop } from '../../Theme';

const NeedHelpWrapper = styled.div`
  position: relative;
`;
const NotificationsWrapper = styled.ul`
  &.disabled {
    display: none;
  }
  ${listArrowTop()}
`;
class NeedHelp extends Component {
  state = {
    showNotifications: false
  };

  onHover = () => {
    this.setState({ showNotifications: true });
  };

  onMouseLeave = () => {
    this.setState({ showNotifications: false });
  };

  render() {
    const { goToNeedHelpPage } = this.props;
    const { showNotifications } = this.state;
    return (
      <NeedHelpWrapper>
        <WhiteButton
          className="roundedShadow"
          onClick={goToNeedHelpPage}
          onMouseEnter={this.onHover}
          onMouseLeave={this.onMouseLeave}
        >
          Need help?
        </WhiteButton>
        <NotificationsWrapper
          className={!showNotifications && 'disabled'}
          onMouseEnter={this.onHover}
          onMouseLeave={this.onMouseLeave}
        >
          notifications
        </NotificationsWrapper>
      </NeedHelpWrapper>
    );
  }
}

export default NeedHelp;
