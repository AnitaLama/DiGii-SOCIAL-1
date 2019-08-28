import React, { Component } from 'react';
import styled from '@emotion/styled';
import { FiSettings } from 'react-icons/fi';
import { connect } from 'react-redux';
import { Colors, listArrowTop, fontSize } from '../../Theme';

const { pen, secondary, snow } = Colors.colors;

const SettingsSubList = styled.ul`
  ${listArrowTop()}
`;
const SettingsListElement = styled.li`
  padding: 10px;
  cursor: pointer;
  &:hover {
    display: block;
    background: ${pen};
    color: ${snow};
  }
`;
const SettingsWrapper = styled.div`
  position: relative;
  svg {
    ${fontSize(25)};
    color: ${secondary};
    &:hover {
      cursor: pointer;
    }
  }
`;

class Settings extends Component {
  state = {
    isListVisible: false
  };

  onHover = () => {
    this.setState({ isListVisible: true });
  };

  onLeave = () => {
    this.setState({ isListVisible: false });
  };

  onClick = () => {
    const { isListVisible } = this.state;
    this.setState({ isListVisible: !isListVisible });
  };

  render() {
    const { logOut, user, onDelete } = this.props;
    const { id, isStudent, groupId } = user;
    const { isListVisible } = this.state;
    return (
      <SettingsWrapper
        onMouseEnter={this.onHover}
        onMouseLeave={this.onLeave}
        onClick={this.onClick}
      >
        <FiSettings style={{ height: '50px' }} />
        {isListVisible && (
          <SettingsSubList>
            <SettingsListElement onClick={logOut}>Logout</SettingsListElement>
            <SettingsListElement
              onClick={() => onDelete({ isStudent, groupId, id })}
            >
              Reset
            </SettingsListElement>
          </SettingsSubList>
        )}
      </SettingsWrapper>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user.user
});

export default connect(mapStateToProps)(Settings);
