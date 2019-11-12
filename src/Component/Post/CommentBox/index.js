import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FaCaretRight, FaImage, FaSmile } from 'react-icons/fa';
import { MdGif } from 'react-icons/md';
import PropTypes from 'prop-types';
import { Mentions } from 'antd';
import { FormInput, Avatar, Button } from '../../StyledComponents';
import CommentActions from '../../../Redux/CommentRedux';
import LoginActions from '../../../Redux/LoginRedux';
import StrikeActions from '../../../Redux/StrikeRedux';
import PostActions from '../../../Redux/PostRedux';
import GroupActions from '../../../Redux/GroupRedux';
import { Moderator, FeelingsList, InputBox } from '../../Functions';

import {
  ClickableButton,
  CommentBoxWrapper,
  CommentBoxContainer,
  GifContainer,
  FeelingsDiv,
  FeelingsButton,
  CommentBoxReactionWrapper
} from './style';

const { Option } = Mentions;

class CommentBox extends Component {
  state = {
    commentText: null
  };

  handleCommentChange = e => {
    console.log('comment=>', e.target.value);
    this.setState({ commentText: e.target.value });
  };

  handleKeyDown = e => {
    const { data, user, onSubmitComment } = this.props;
    const { isStudent, id } = user.user;
    const { postId } = data;
    const { commentText } = this.state;
    if (e.key === 'Enter') {
      const comment = {
        postCommentPostId: postId,
        postCommentIsStudent: isStudent,
        postCommentCommentatorId: id,
        postCommentTitle: 'Comment',
        postCommentBody: commentText
      };
      if (commentText.length > 0) {
        onSubmitComment(comment);
        setTimeout(() => {
          this.setState({ commentText: null });
        }, 1500);
      }
    }
  };

  render() {
    const { postText, user, data } = this.props;
    const { commentText } = this.state;
    const { avatar } = user.user;
    return (
      <CommentBoxWrapper>
        <div>
          <Avatar avatar={avatar} height={20} />
        </div>
        <CommentBoxContainer>
          <InputBox
            placeholder="Write a comment"
            onChange={this.handleCommentChange}
            onKeyDown={this.handleKeyDown}
            value={commentText || ''}
          />
          <CommentBoxReactionWrapper>
            <FaSmile className="feelings" />
            <FaImage className="image" />
            <MdGif className="gif" />
          </CommentBoxReactionWrapper>
        </CommentBoxContainer>
      </CommentBoxWrapper>
    );
  }
}

CommentBox.propTypes = {
  strike: PropTypes.object,
  user: PropTypes.object,
  post: PropTypes.object,
  onGetStrikesCountOfAUser: PropTypes.func,
  disableFirstTimePosting: PropTypes.func,
  onGetAllUsersOfAGroup: PropTypes.func,
  group: PropTypes.object,
  onFocus: PropTypes.func,
  postText: PropTypes.string,
  handlePostText: PropTypes.func,
  submitPost: PropTypes.func,
  onBlockUser: PropTypes.func,
  showWarning: PropTypes.func,
  onSubmitComment: PropTypes.func,
  resetPostText: PropTypes.func,
  data: PropTypes.object,
  updatePostText: PropTypes.func,
  onPostImage: PropTypes.func
};

const mapStateToProps = state => ({
  postActivity: state.postActivity,
  user: state.user,
  post: state.post,
  strike: state.strike,
  group: state.group
});

const mapDispatchToProps = dispatch => ({
  onSubmitComment: value => dispatch(CommentActions.onSubmitCommentRequest(value)),
  onGetStrikesCountOfAUser: value => dispatch(StrikeActions.onGetStrikesCountOfAUser(value)),
  disableFirstTimePosting: () => dispatch(LoginActions.onDisableFirstTimePosting()),
  onBlockUser: value => dispatch(LoginActions.onBlockUser(value)),
  onFindGifForComments: value => dispatch(PostActions.onFindGifForComments(value)),
  clearCommentGif: () => dispatch(PostActions.clearCommentGif()),
  onPostImage: value => dispatch(PostActions.onPostImage(value)),
  onGetAllUsersOfAGroup: value => dispatch(GroupActions.onGetAllUsersOfAGroup(value))
});

export default Moderator(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CommentBox)
);
