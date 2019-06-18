import React, { Component } from 'react';
import {
  ContainerWrapper,
  ContentWrapper
} from '../../Component/StyledComponents';
import { Header } from '../../Component/MessageBoard';

class MessageBoard extends Component {
  render() {
    return (
      <ContainerWrapper>
        <ContentWrapper>
          <Header />
        </ContentWrapper>
      </ContainerWrapper>
    );
  }
}

export default MessageBoard;
