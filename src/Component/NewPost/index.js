import React, { Component } from 'react';
import { NewPostWrapper, NewPostContainer } from './style';
import PostTypes from './postTypes';
import TextPost from './textbox';
import ImagePost from './image';
import BannerPost from './banner';
import GifPost from './gif';
import FeelingsPost from './feeling';
import PollPost from './poll';

class NewPost extends Component {
  state = {
    isImagePost: false,
    isBannerPost: false,
    isFeelingPost: false,
    isTagPost: false,
    isPollPost: false,
    isGifPost: false,
    showPostTypes: false
  };

  handleNewPostFocus = () => {
    this.setState({ showPostTypes: true });
  };

  handleNewPostBlur = () => {
    this.setState({ showPostTypes: false });
  };

  handlePostTypeOptionClick = option => {
    const {
      isImagePost,
      isBannerPost,
      isFeelingPost,
      isTagPost,
      isPollPost,
      isGifPost
    } = this.state;
    switch (option.value) {
      case 'image':
        this.setState({
          isImagePost: !isImagePost,
          isBannerPost: false,
          isGifPost: false,
          isPollPost: false
        });
        break;
      case 'banner':
        this.setState({
          isBannerPost: !isBannerPost,
          isImagePost: false,
          isGifPost: false,
          isPollPost: false
        });
        break;
      case 'feeling':
        this.setState({ isFeelingPost: !isFeelingPost });
        break;
      case 'tag':
        this.setState({ isTagPost: !isTagPost });
        break;
      case 'poll':
        this.setState({
          isPollPost: !isPollPost,
          isBannerPost: false,
          isImagePost: false,
          isGifPost: false,
          isFeelingPost: false
        });
        break;
      case 'gif':
        this.setState({
          isGifPost: !isGifPost,
          isImagePost: false,
          isBannerPost: false,
          isPollPost: false
        });
        break;
      default:
        break;
    }
  };

  render() {
    const {
      showPostTypes,
      isImagePost,
      isBannerPost,
      isFeelingPost,
      isPollPost,
      isGifPost
    } = this.state;
    const check = isImagePost || isBannerPost || isFeelingPost || isPollPost || isGifPost;
    return (
      <NewPostWrapper
        tabIndex="-1"
        onFocus={this.handleNewPostFocus}
        onBlur={this.handleNewPostBlur}
      >
        <NewPostContainer>
          <TextPost />
          {isPollPost && <PollPost />}
          {isFeelingPost && <FeelingsPost />}
          {isGifPost && <GifPost />}
          {isImagePost && <ImagePost />}
          {isBannerPost && <BannerPost />}
        </NewPostContainer>
        {(showPostTypes || check) && (
          <PostTypes
            handlePostTypeOptionClick={this.handlePostTypeOptionClick}
          />
        )}
      </NewPostWrapper>
    );
  }
}

export default NewPost;
