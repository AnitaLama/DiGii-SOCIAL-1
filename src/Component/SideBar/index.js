import React, { Component } from 'react';
import styled from '@emotion/styled';
import { FaRegTimesCircle, FaRegCircle } from 'react-icons/fa';
import { connect } from 'react-redux';
import socketClient from 'socket.io-client';
import { Colors, fontSize, Images } from '../../Theme';
import { Tabs } from '../MessageBoard';
import { strikeCount } from '../../utils/config';
import { SOCKET_URL } from '../../utils/config';
import {
  SideBarContainer,
  SideBarWrapper,
  GroupOne,
  Icon,
  GroupElement,
  Type,
  Title,
  Count
} from './style';

const SideBarMenus = [
  { menu: 'Videos', icon: Images.digii5.Video },
  { menu: 'Tutorials', icon: Images.digii5.Video },
  { menu: 'Quizzes', icon: Images.digii5.Quiz },
  { menu: 'Report', icon: Images.digii5.Video }
];
class SideBar extends Component {
  constructor() {
    super();
    this.socket = socketClient(SOCKET_URL);
  }

  render() {
    const { strike } = this.props;
    const count = strike % strikeCount;
    const check = strike !== 0 && count === 0;
    this.socket.on('strikes', data => {
      console.log('data sockets strikes', data);
    });
    return (
      <SideBarContainer>
        <SideBarWrapper>
          <GroupOne>
            {SideBarMenus.map((item, i) => (
              <GroupElement key={`menu${i}`}>
                <Icon src={item.icon} alt={`icon-${item.menu}`} />
                <Type>{item.menu}</Type>
              </GroupElement>
            ))}
          </GroupOne>
          <GroupOne>
            <Title>Strikes</Title>
            <Count>
              {check || count > 0 ? (
                <FaRegTimesCircle className="red" />
              ) : (
                <FaRegCircle />
              )}
              {check || count > 1 ? (
                <FaRegTimesCircle className="red" />
              ) : (
                <FaRegCircle />
              )}
              {check ? <FaRegTimesCircle className="red" /> : <FaRegCircle />}
            </Count>
          </GroupOne>
        </SideBarWrapper>
        <Tabs />
      </SideBarContainer>
    );
  }
}

const mapStateToProps = state => ({
  strike: state.strike.strikes
});
export default connect(mapStateToProps)(SideBar);
