import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import { FaCaretRight, FaImage } from 'react-icons/fa';
import { MdGif } from 'react-icons/md';
import PropTypes from 'prop-types';
import { FormInput, Avatar, Button } from '../StyledComponents';
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
  button:not(.findButton) {
    background: none;
    border: 0;
    outline: 0;
    width: auto;
    vertical-align: bottom;
  }
  .findButton {
    height: 45px;
  }
  input {
    padding: 10px;
  }
  .buttonDiv {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    vertical-align: ;
  }
`;
const GifContainer = styled.div`
  maxheight: 250px;
  width: 100%;
  position: absolute;
  bottom: 0;
  zindex: 1;
  div {
    display: flex;
  }
`;
class CommentBox extends Component {
  state = {
    showGifInput: false,
    gifText: ''
  };

  componentWillMount() {
    const { onGetStrikesCountOfAUser, user } = this.props;
    const { isStudent, id } = user.user;
    onGetStrikesCountOfAUser({ isStudent, id });
  }

  componentDidMount() {
    this.commentInput.focus();
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
    this.setState({ showGifInput: true }, () => {
      this.gifInput.focus();
    });
  };

  handleGifText = e => {
    const { value } = e.target;
    this.setState({ gifText: value });
  };

  findGif = () => {
    console.log('find gifs', window.innerWidth, window.innerHeight);
    const { onFindGifForComments } = this.props;
    const { gifText } = this.state;
    const width = window.innerWidth || 1024;
    onFindGifForComments({ text: gifText, limit: width > 960 ? 20 : 12 });
  };

  getGif = () => {
    const { post } = this.props;
    const { commentGif } = post;
    return (
      commentGif
      && commentGif.map(item => (
        <img
          src={item.images.downsized_medium.url}
          style={{ height: '60px', width: '60px' }}
          onClick={() => {
            this.selectAGif(item.images.downsized_medium.url);
          }}
        />
      ))
    );
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
    const { gifText } = this.state;
    clearCommentGif();
    this.setState({ showGifInput: !!(gifText.length > 0) });
  };

  aa;

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
          ref={r => {
            this.commentInput = r;
          }}
        />
        <GifContainer
          style={{
            display: this.state.showGifInput ? 'block' : 'none'
          }}
        >
          {this.getGif()}
          <div>
            <FormInput
              placeholder="Find Gif"
              onChange={this.handleGifText}
              onBlur={this.onBlur}
              ref={r => {
                this.gifInput = r;
              }}
            />
            <Button onClick={this.findGif} className="findButton rounded short">
              Find
            </Button>
          </div>
        </GifContainer>
        <div className="buttonDiv">
          <input
            type="file"
            multiple={false}
            ref={r => {
              this.fileInput = r;
            }}
            style={{ display: 'none' }}
            onChange={this.selectImage}
          />
          <button onClick={this.handleSelectImage}>
            <FaImage />
          </button>
          <button onClick={this.handleGifButtonClick}>
            <MdGif />
          </button>
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
