import React, { Component } from 'react';
import {
  ContainerWrapper,
  ContentWrapper
} from '../../Component/StyledComponents';
import { Header, Features, NewPost } from '../../Component/MessageBoard';

class MessageBoard extends Component {
  render() {
    return (
      <ContainerWrapper>
        <ContentWrapper>
          <Header />
          <Features />
          <NewPost />
        </ContentWrapper>
      </ContainerWrapper>
    );
  }
}

export default MessageBoard;
