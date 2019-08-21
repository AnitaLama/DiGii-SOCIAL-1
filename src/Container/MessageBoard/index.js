import React, { Component } from 'react';
import styled from '@emotion/styled';
import {
  ContainerWrapper,
  ContentWrapper
} from '../../Component/StyledComponents';
import { Header, Body } from '../../Component/MessageBoard';

// const Body = lazy(() => import('../../Component/MessageBoard/Body'));

const HeaderWrapper = styled.div`
  position:sticky;
  top:0;
  border-bottom 1px solid rgba(0,0,0,0.15);
  z-index:10;
  background:white;
  box-shadow:0px 2px 10px 0px rgba(0,0,0,0.15)
`;
class MessageBoard extends Component {
  render() {
    return (
      <div>
        <HeaderWrapper>
          <ContentWrapper>
            <Header />
          </ContentWrapper>
        </HeaderWrapper>
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
