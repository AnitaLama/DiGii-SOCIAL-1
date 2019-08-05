import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import { FaCaretRight } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { Images } from '../../Theme';
import { FormInput, Avatar } from '../StyledComponents';
import CommentActions from '../../Redux/CommentRedux';
import LoginActions from '../../Redux/LoginRedux';
import StrikeActions from '../../Redux/StrikeRedux';
import Moderator from '../NewPost/Moderator';

const CommentBoxWrapper = styled.div`
  display: grid;
  grid-template-columns: 20px auto;
  width: 100%;
  position: relative;
  button {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    background: none;
    border: 0;
    outline: 0;
  }
  input {
    padding: 10px;
  }
`;
const Image = styled.img`
  height: 20px;
  border-radius: 20px;
`;
class CommentBox extends Component {
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
    // const { user, disableFirstTimePosting, post } = this.props;
    // const { posts } = post;
    // // console.log(posts);
    // const isFirstTimePosting = posts.find(
    //   item => item.p_actor_id === user.user.id
    // );
    // if (
    //   user.user.isStudent
    //   && !isFirstTimePosting
    //   && user.user.isFirstTimePosting
    // ) {
    //   disableFirstTimePosting();
    //   this.setState({
    //     isModalVisible: true,
    //     alertMessage: 'Congratulations!!! it\'s your first time posting.'
    //   });
    //
    //   // alert('Congratulations!!! it\'s your first time posting.');
    // }
    // this.setState({
    //   hasPost: true
    // });
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
      onPostSubmit,
      showWarning,
      resetPostType,
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
    console.log(comment);
    onSubmitComment(comment);
    resetPostText();
  };

  render() {
    const { postText, user } = this.props;
    const { avatar } = user.user;
    return (
      <CommentBoxWrapper>
        <Avatar avatar={avatar} height={20} />

        <FormInput
          placeholder="Write a comment"
          onChange={this.handleComment}
          onKeyDown={this.handleKeyDown}
          onFocus={this.onFocus}
          style={{ height: '24px', marginLeft: '6px', marginBottom: 0 }}
          value={postText}
        />
        <button onClick={this.handleCommentReply}>
          <FaCaretRight />
        </button>
      </CommentBoxWrapper>
    );
  }
}

CommentBox.propTypes = {
  strike: PropTypes.object,
  user: PropTypes.object,
  post: PropTypes.object,
  onPostSubmit: PropTypes.func,
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
  onBlockUser: value => dispatch(LoginActions.onBlockUser(value))
});
export default Moderator(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CommentBox)
);
