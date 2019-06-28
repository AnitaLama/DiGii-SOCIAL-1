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
// const Post = styled.div`
//   padding: 6px 0;
// `;
// const Reactions = styled.div`
//   ${flex('row')};
//   padding: 0 6px;
//   border-radius: 5px;
//   display: inline;
// `;
// const DisplayText = styled.div`
//   cursor: pointer;
//   position: relative;
//   h5 {
//     border-radius: 4px;
//     color: ${snow};
//     padding: 0 20px;
//     background: ${primary};
//     display: inline;
//   }
//   div {
//     display: none;
//     position: absolute;
//     top: -20px;
//     left: 0;
//     &:hover {
//       display: block;
//     }
//   }
//   &:hover {
//     h5 {
//       background: ${secondary};
//     }
//     div {
//       display: block;
//     }
//   }
// `;
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
// const reactions = [
//   { icon: <FaThumbsUp />, color: primary, value: 'like' },
//   { icon: <FaHeart />, color: 'red', value: 'heart' },
//   { icon: <FaLaugh />, color: 'yellow', value: 'laugh' },
//   { icon: <FaFrown />, color: 'blue', value: 'sad' },
//   { icon: <FaSadCry />, color: 'yellow', value: 'cry' },
//   { icon: <FaAngry />, color: 'red', value: 'angry' }
// ];
class SinglePost extends Component {
  handleReactionClick = reaction => {
    console.log(reaction);
  };

  render() {
    const { data } = this.props;
    const { comments } = data;
    return (
      <PostWrapper>
        <div>
          <Author data={data} />
          {/* <Post>{post}</Post> */}
        </div>
        {/* <DisplayText>
          <h5>LIKE</h5>
          <Reactions>
            {reactions.map((reaction, i) => (
              <Reaction
                key={reaction + i}
                item={reaction}
                handleReactionClick={this.handleReactionClick}
              />
            ))}
          </Reactions>
        </DisplayText> */}
        <CommentContainer>
          {comments.map((comment, i) => (
            <Comment key={comment + i} data={comment} />
          ))}
          <CommentBox />
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
