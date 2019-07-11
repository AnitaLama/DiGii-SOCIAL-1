import React, { Component } from 'react';
import {
  ContainerWrapper,
  ContentWrapper
} from '../../Component/StyledComponents';
import { Header, Body } from '../../Component/MessageBoard';
import { SessionHOC } from '../HOC';

class MessageBoard extends Component {
  render() {
    return (
      <ContainerWrapper>
        <ContentWrapper>
          <Header />
          {/* <Features />
           */}
          <Body />
        </ContentWrapper>
      </ContainerWrapper>
    );
  }
}

export default SessionHOC(MessageBoard);
