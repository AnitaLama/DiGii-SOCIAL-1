import React, { Component } from 'react';
import {
  ContainerWrapper,
  ContentWrapper
} from '../../Component/StyledComponents';
import { Header, Body } from '../../Component/MessageBoard';

class MessageBoard extends Component {
  componentWillMount() {
    console.log();
  }

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
