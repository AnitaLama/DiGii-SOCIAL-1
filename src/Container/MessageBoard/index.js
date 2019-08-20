import React, { Component } from 'react';
import {
  ContainerWrapper,
  ContentWrapper
} from '../../Component/StyledComponents';
import { Header, Body } from '../../Component/MessageBoard';

// const Body = lazy(() => import('../../Component/MessageBoard/Body'));

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

export default MessageBoard;
