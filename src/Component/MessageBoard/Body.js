import React, { Component } from 'react';
import styled from '@emotion/styled';
import { NewPost, Posts, SideBar } from './index';

const BodyWrapper = styled.div`
  display: grid;
  grid-template-columns: 70% auto;
`;
class Body extends Component {
  render() {
    return (
      <BodyWrapper>
        <div>
          <NewPost />
          <Posts />
        </div>
        <SideBar />
      </BodyWrapper>
    );
  }
}

export { Body };
