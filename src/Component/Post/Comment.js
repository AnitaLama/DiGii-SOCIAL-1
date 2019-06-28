import React, { Component } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { FaTimesCircle } from 'react-icons/fa';
import {
  Images, flex, fontSize, fontWeight, Colors
} from '../../Theme';
import { Avatar } from '../StyledComponents';

const { grey, pink } = Colors.colors;
const CommentWrapper = styled.div`
  ${flex};
  padding: 8px 0;
  width: 100%;
`;

const CommentDiv = styled.div`
  ${flex('column')};
  position: relative;
  width: 100%;
  span:first-of-type {
    ${fontWeight('bold')};
  }
  span:not(:first-of-type) {
    ${fontSize(12)};
  }
  span.date {
    ${fontSize(10)};
  }
  span:last-of-type {
    color: ${grey};
  }
`;
const Close = styled.div`
  position: absolute;
  right: 0;
  color: ${pink};
  cursor: pointer;
  svg {
    ${fontSize(24)};
  }
`;
class Comment extends Component {
  constructor() {
    super();
    this.state = {
      isCommentHidden: false
    };
  }

  hideComment = () => {
    this.setState({ isCommentHidden: true });
  };

  render() {
    const { isCommentHidden } = this.state;
    const { data } = this.props;
    const { user } = data;
    return !isCommentHidden ? (
      <CommentWrapper>
        <Avatar src={Images.stockImage} height={24} rightMargin={6} />
        <CommentDiv>
          <span>
            {user.firstName}
            {' '}
            {user.lastName}
          </span>
          <Close onClick={this.hideComment}>
            <FaTimesCircle />
          </Close>
          {/* <span className="date">
            {new Date(createdAt).toLocaleDateString()}
          </span> */}
          <span>{data.commentDescription}</span>
        </CommentDiv>
      </CommentWrapper>
    ) : (
      <div />
    );
  }
}

Comment.propTypes = {
  data: PropTypes.object
};
export default Comment;
