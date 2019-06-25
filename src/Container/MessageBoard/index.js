import React, { Component } from 'react';
import {
  ContainerWrapper,
  ContentWrapper
} from '../../Component/StyledComponents';
import {
  Header, Features, NewPost, Posts
} from '../../Component/MessageBoard';

class MessageBoard extends Component {
  componentWillMount() {
    console.log();
  }

  render() {
    return (
      <ContainerWrapper>
        <ContentWrapper>
          <Header />
          <Features />
          <NewPost />
          <Posts />
        </ContentWrapper>
      </ContainerWrapper>
    );
  }
}

export default MessageBoard;
