import React, { Component } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import {
  Colors,
  fontSize,
  grid,
  boxShadow,
  Images,
  fontFilson,
  flexCentering
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
const ActualPostWrapper = styled.div`
  padding-right: 20px;
`;

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  padding-left: 20px;
`;
const ReactionsContainer = styled.div`
  display: flex;

  img {
    height: 11.01px;
    padding-right: 6px;
  }
  span {
    padding: 0 10px;
    ${fontFilson};
    ${fontSize(12)};
    ${flexCentering()};
    color: ${Colors.colors.dark};
    cursor: pointer;
    &:hover {
      color: black;
      img {
        height: 11.73px;
      }
    }
  }
`;
const ActualPost = styled.div`
  padding: 10px 0;
  .captions {
    padding-bottom: 10px;
  }
  div {
    color: ${Colors.colors.light};
    ${fontSize(14)};
    line-height: 17px;
  }
`;
const Reactions = () => (
  <ReactionsContainer>
    <span className="like">
      <img src={Images.digii5.LikeIcon} />
      Like
    </span>
    <span className="comment">
      <img src={Images.digii5.CommentIcon} />
      Comment
    </span>
    <span className="share">
      <img src={Images.digii5.ShareIcon} />
      Share
    </span>
  </ReactionsContainer>
);

const Gif = styled.img`
  width: 100%;
`;

class SinglePost extends Component {
  handleReactionClick = reaction => {
    console.log(reaction);
  };

  getContent = data => {
    const { p_body, post_type, p_text } = data;
    const type = post_type && post_type.pt_title;
    switch (type) {
      case 'text':
        return <div>{p_body}</div>;
      case 'gif':
        return (
          <div>
            <div className="captions">{p_text}</div>
            <Gif src={`${p_body}`} />
          </div>
        );
      case 'photo/video':
        return (
          <div>
            <div className="captions">{p_text}</div>
            <Gif src={`${p_body}`} />
          </div>
        );
      default:
        return <div>{p_body}</div>;
    }
  };

  render() {
    const { data } = this.props;
    const { post_comments } = data;
    return (
      <PostWrapper>
        <ActualPostWrapper>
          <Author data={data} />
          <ActualPost>{this.getContent(data)}</ActualPost>
          <Reactions />
        </ActualPostWrapper>

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

export default SinglePost;
