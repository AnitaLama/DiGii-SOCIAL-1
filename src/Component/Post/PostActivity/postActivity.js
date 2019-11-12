import React, { Component } from 'react';
import {
  PostActivityWrapper,
  PostActivityContainer,
  PostActivityIcon
} from './style';
import { Images } from '../../../Theme';
import LikeReaction from './likeReaction';

const { CommentIcon, DiGiiShareIcon } = Images.digii5;
class PostActivity extends Component {
  state = {
    showReactionList: false
  };

  handleFocus = () => {
    this.setState({
      showReactionList: true
    });
  };

  handleBlur = () => {
    this.setState({
      showReactionList: false
    });
  };

  render() {
    const { showCommentBox } = this.props;
    return (
      <PostActivityWrapper
        tabIndex="-4"
        onFocus={this.handleFocus}
        // onBlur={this.handleBlur}
      >
        <LikeReaction {...this.props} {...this.state} />
        <PostActivityContainer onClick={showCommentBox} {...this.props}>
          <PostActivityIcon src={CommentIcon} alt="DiGii-comment-icon" />
          <span> Comment</span>
        </PostActivityContainer>
        <PostActivityContainer>
          <PostActivityIcon src={DiGiiShareIcon} alt="DiGii-share-icon" />
          <span> Share</span>
        </PostActivityContainer>
      </PostActivityWrapper>
    );
  }
}

export default PostActivity;
