import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import { FaCaretRight } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { FormInput, Avatar } from '../StyledComponents';
import CommentActions from '../../Redux/CommentRedux';
import LoginActions from '../../Redux/LoginRedux';
import StrikeActions from '../../Redux/StrikeRedux';
import PostActions from '../../Redux/PostRedux';

import Moderator from '../NewPost/Moderator';

const CommentBoxWrapper = styled.div`
  display: grid;
  grid-template-columns: 20px auto;
  width: 100%;
  position: relative;
  button {
  }
  input {
    padding: 10px;
  }
  .buttonDiv {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    background: none;
    border: 0;
    outline: 0;
  }
`;

class CommentBox extends Component {
  state = {
    showGifInput: false
  };

  componentWillMount() {
    const { onGetStrikesCountOfAUser, user } = this.props;
    const { isStudent, id } = user.user;
    onGetStrikesCountOfAUser({ isStudent, id });
  }

  onFocus = () => {
    const {
      user, disableFirstTimePosting, post, onFocus
    } = this.props;
    const { posts } = post;
    const { id, isFirstTimePosting } = user.user;
    const checkFirstTimePosting = onFocus(posts, id);

    if (checkFirstTimePosting && isFirstTimePosting) {
      disableFirstTimePosting();
    }
  };

  handleKeyDown = event => {
    if (event.key === 'Enter') {
      this.handleCommentReply();
    }
  };

  hideModal = () => {
    this.setState({
      isModalVisible: false,
      alertMessage: null
    });
  };

  handleComment = e => {
    const { handlePostText } = this.props;
    handlePostText(e);
  };

  handleCommentReply = () => {
    const {
      submitPost,
      strike,
      user,
      onBlockUser,
      postText,
      showWarning,
      onGetStrikesCountOfAUser,
      data,
      onSubmitComment,
      resetPostText
    } = this.props;
    const { p_id } = data;
    const { isStudent, id } = user.user;
    const { strikes } = strike;
    const result = submitPost();
    onGetStrikesCountOfAUser({ isStudent, id });

    let isBad = 0;
    if (result) {
      if (strikes > 8 && isStudent) {
        // BLOCK THE USER
        onBlockUser({ isStudent, id });
      }
      showWarning(strikes, isStudent);
      isBad = 1;
    }

    const comment = {
      pc_p_id: p_id,
      pc_is_student: user.user.isStudent,
      pc_commentator_id: user.user.id,
      pc_title: 'Comment',
      pc_body: postText,
      isBad,
      pc_is_bad: isBad,
      str_type: result,
      str_is_student: user.user.isStudent,
      str_actor_id: user.user.id
    };
    onSubmitComment(comment);
    resetPostText();
  };

  handleSelectImage = () => {
    console.log('handle select image');
    const { fileInput } = this;
    this.fileInput.click();
  };

  selectImage = e => {
    const { files } = e.target;
    this.setState({ file: files });
  };

  handleGifButtonClick = () => {
    this.setState({ showGifInput: true });
    console.log(this.gifInput);
    this.gifInput.focus();
  };

  handleGifText = e => {
    const { value } = e.target;
    console.log('value gif', value);
    this.setState({ gifText: value });
  };

  findGif = () => {
    const { onFindGifForComments } = this.props;
    const { gifText } = this.state;
    onFindGifForComments(gifText);
  };

  getGif = () => {
    const { post } = this.props;
    const { commentGif } = post;
    return commentGif.map(item => (
      <img
        src={item.images.downsized_medium.url}
        style={{ height: '60px', width: '60px' }}
        onClick={() => {
          this.selectAGif(item.images.downsized_medium.url);
        }}
      />
    ));
  };

  selectAGif = gif => {
    const {
      user, onSubmitComment, data, clearCommentGif
    } = this.props;
    console.log('selectgif', data);
    const { p_id } = data;
    const comment = {
      pc_p_id: p_id,
      pc_is_student: user.user.isStudent,
      pc_commentator_id: user.user.id,
      pc_title: 'Comment',
      pc_image_path: gif,
      isBad: 0,
      pc_is_bad: 0,
      str_type: null,
      str_is_student: user.user.isStudent,
      str_actor_id: user.user.id
    };
    console.log(comment);
    onSubmitComment(comment);
    clearCommentGif();
    this.setState({ showGifInput: false });
  };

  onBlur = () => {
    const { clearCommentGif } = this.props;
    clearCommentGif();
    this.setState({ showGifInput: false });
  };

  render() {
    const { postText, user } = this.props;
    const { avatar } = user.user;
    return (
      <CommentBoxWrapper
        style={{
          position: 'relative'
        }}
      >
        <Avatar avatar={avatar} height={20} />

        <FormInput
          placeholder="Write a comment"
          onChange={this.handleComment}
          onKeyDown={this.handleKeyDown}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          style={{ height: '24px', marginLeft: '6px', marginBottom: 0 }}
          value={postText}
        />
        <div
          style={{
            maxHeight: '250px',
            width: '100%',
            position: 'absolute',
            display: this.state.showGifInput ? 'block' : 'none',
            bottom: 0,
            zIndex: 1
          }}
        >
          <div>{this.getGif()}</div>
          <input
            placeholder="Find Gif"
            onChange={this.handleGifText}
            onBlur={this.onBlur}
            ref={r => (this.gifInput = r)}
          />
          <button onClick={this.findGif}>Find</button>
        </div>
        <div className="buttonDiv">
          <input
            type="file"
            multiple={false}
            ref={r => (this.fileInput = r)}
            style={{ display: 'none' }}
            onChange={this.selectImage}
          />
          <button onClick={this.handleSelectImage}>Image</button>
          <button onClick={this.handleGifButtonClick}>GIF</button>
          <button onClick={this.handleCommentReply}>
            <FaCaretRight />
          </button>
        </div>
      </CommentBoxWrapper>
    );
  }
}

CommentBox.propTypes = {
  strike: PropTypes.object,
  user: PropTypes.object,
  post: PropTypes.object,
  onGetStrikesCountOfAUser: PropTypes.func,
  disableFirstTimePosting: PropTypes.func
};
const mapStateToProps = state => ({
  postActivity: state.postActivity,
  user: state.user,
  post: state.post,
  strike: state.strike
});

const mapDispatchToProps = dispatch => ({
  onSubmitComment: value => dispatch(CommentActions.onSubmitCommentRequest(value)),
  onGetStrikesCountOfAUser: value => dispatch(StrikeActions.onGetStrikesCountOfAUser(value)),
  disableFirstTimePosting: () => dispatch(LoginActions.onDisableFirstTimePosting()),
  onBlockUser: value => dispatch(LoginActions.onBlockUser(value)),
  onFindGifForComments: value => dispatch(PostActions.onFindGifForComments(value)),
  clearCommentGif: () => dispatch(PostActions.clearCommentGif())
});
export default Moderator(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CommentBox)
);
