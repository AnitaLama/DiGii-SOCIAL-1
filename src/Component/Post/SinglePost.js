import React, { Component } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import {
  FaAngry,
  FaSadCry,
  FaHeart,
  FaLaugh,
  FaFrown,
  FaThumbsUp
} from 'react-icons/fa';
import { Colors, flex, fontSize } from '../../Theme';
import Author from './Author';

const { snow, pink, peach } = Colors.colors;
const PostWrapper = styled.div`
  background: ${snow};
  margin: 6px 0;
  padding: 20px;
  border-radius: 10px;
`;
const Post = styled.div`
  padding: 10px 0;
`;
const Reactions = styled.div`
  ${flex('row')};
  padding: 0 6px;
  border-radius: 5px;
  display: inline;
`;
const DisplayText = styled.div`
  cursor: pointer;
  position: relative;
  h5 {
    border-radius: 4px;
    color: ${snow};
    padding: 0 20px;
    background: ${pink};
    display: inline;
  }
  div {
    display: none;
    position: absolute;
    top: -20px;
    left: 0;
    &:hover {
      display: block;
    }
  }
  &:hover {
    h5 {
      background: ${peach};
    }
    div {
      display: block;
    }
  }
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
const Reaction = ({ item }) => {
  const { icon, color } = item;
  return <Icon style={{ color }}>{icon}</Icon>;
};
const reactions = [
  { icon: <FaThumbsUp />, color: pink },
  { icon: <FaHeart />, color: 'red' },
  { icon: <FaLaugh />, color: 'yellow' },
  { icon: <FaFrown />, color: 'blue' },
  { icon: <FaSadCry />, color: 'yellow' },
  { icon: <FaAngry />, color: 'red' }
];
class SinglePost extends Component {
  render() {
    const { data } = this.props;
    const { post } = data;
    console.clear();
    console.log(data);
    return (
      <PostWrapper>
        <Author data={data} />
        <Post>{post}</Post>
        <DisplayText>
          <h5>LIKE</h5>
          <Reactions>
            {reactions.map(reaction => <Reaction item={reaction} />)}
          </Reactions>
        </DisplayText>
      </PostWrapper>
    );
  }
}
SinglePost.propTypes = { data: PropTypes.object };
Reaction.propTypes = { item: PropTypes.object };
export default SinglePost;
