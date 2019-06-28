import React, { Component } from 'react';
import styled from '@emotion/styled';
import { Images } from '../../Theme';
import { FormInput } from '../StyledComponents';

const CommentBoxWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto;
`;
const Image = styled.img`
  height: 20px;
  border-radius: 20px;
`;
class CommentBox extends Component {
  render() {
    return (
      <CommentBoxWrapper>
        <Image src={Images.stockImage} />
        <FormInput placeholder="Write a comment" style={{ height: '24px' }} />
      </CommentBoxWrapper>
    );
  }
}

export default CommentBox;
