import React, { Component } from 'react';
import {
  ContainerWrapper,
  ContentWrapper
} from '../../Component/StyledComponents';
import { Header, Body } from '../../Component/MessageBoard';

class MessageBoard extends Component {
  render() {
    return (
      <div>
        <Header />
        <ContainerWrapper>
          <ContentWrapper>
            {/* <Features />
             */}
            <Body />
          </ContentWrapper>
        </ContainerWrapper>
      </div>
    );
  }
}

export default MessageBoard;
