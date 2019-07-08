import React, { Component } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
// import {
//   FaAngry,
//   FaSadCry,
//   FaHeart,
//   FaLaugh,
//   FaFrown,
//   FaThumbsUp
// } from 'react-icons/fa';
import {
  Colors, fontSize, grid, boxShadow
} from '../../Theme';
import Author from './Author';
import Comment from './Comment';
import CommentBox from './CommentBox';

const { snow } = Colors.colors;
const PostWrapper = styled.div`
  background: ${snow};
  margin: 28px 0;
  padding: 24px;
  border-radius: 40px;
  ${boxShadow()};
  ${grid(2, '1fr')};
`;

const Icon = styled.span`
  padding: 4px;
  transition: all 0.4s ease-in-out;
  vertical-align: top;
  ${fontSize(16)};
  &:hover {
    // position: absolute;
    ${fontSize(26)};
    // font-size: 26px;
  }
`;
const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
`;
const Reaction = ({ item, handleReactionClick }) => {
  const { icon, color } = item;
  return (
    <Icon
      style={{ color }}
      onClick={() => {
        handleReactionClick(item);
      }}
    >
      {icon}
    </Icon>
  );
};

class SinglePost extends Component {
  handleReactionClick = reaction => {
    console.log(reaction);
  };

  render() {
    const { data } = this.props;
    const { post_comments } = data;
    return (
      <PostWrapper>
        <div>
          <Author data={data} />
        </div>

        <CommentContainer>
          {post_comments
            && post_comments.map((comment, i) => (
              <Comment key={comment + i} data={comment} />
            ))}
          <CommentBox post={data} />
        </CommentContainer>
      </PostWrapper>
    );
  }
}
SinglePost.propTypes = { data: PropTypes.object };
Reaction.propTypes = {
  item: PropTypes.object,
  handleReactionClick: PropTypes.func
};
export default SinglePost;
