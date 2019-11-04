import React, { Component } from 'react';
import { Images } from '../../Theme';
import {
  PostTypesWrapper,
  PostTypesContainer,
  SinglePostTypeWrapper,
  Icon
} from './style';

const postTypesList = [
  { text: 'PHOTO/VIDEO', icon: Images.digii5.Photo, value: 'image' },
  { text: 'BANNER', icon: Images.digii5.Banner, value: 'banner' },
  { text: 'FEELING', icon: Images.digii5.Feeling, value: 'feeling' },
  { text: 'TAG', icon: Images.digii5.Tag, value: 'tag' },
  { text: 'POLL', icon: Images.digii5.Poll, value: 'poll' },
  { text: 'GIF', icon: Images.digii5.GIF, value: 'gif' }
];
class PostTypes extends Component {
  render() {
    const { handlePostTypeOptionClick } = this.props;
    return (
      <PostTypesWrapper>
        <PostTypesContainer>
          {postTypesList.map(postType => (
            <SinglePostTypeWrapper
              key={postType.text}
              onClick={() => {
                handlePostTypeOptionClick(postType);
              }}
            >
              <Icon>
                <img src={postType.icon} />
              </Icon>
              <span>{postType.text}</span>
            </SinglePostTypeWrapper>
          ))}
        </PostTypesContainer>
      </PostTypesWrapper>
    );
  }
}

export default PostTypes;
