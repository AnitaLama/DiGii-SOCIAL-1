import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import { FaCaretRight } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { Images } from '../../Theme';
import { FormInput, Modal } from '../StyledComponents';
import CommentActions from '../../Redux/CommentRedux';
import { FilterKeyWords, warnings } from '../NewPost/index';
import LoginActions from '../../Redux/LoginRedux';
import StrikeActions from '../../Redux/StrikeRedux';

const strikeCount = 3;

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
`;
const Image = styled.img`
  height: 20px;
  border-radius: 20px;
`;
class CommentBox extends Component {
  constructor() {
    super();
    this.state = {
      commentText: '',
      isModalVisible: false,
      isBad: false,
      alertmessage: null
    };
  }

  showHasPost = () => {
    const { user, disableFirstTimePosting, post } = this.props;
    const { posts } = post;
    // console.log(posts);
    const isFirstTimePosting = posts.find(
      item => item.p_actor_id === user.user.id
    );
    if (
      user.user.isStudent
      && !isFirstTimePosting
      && user.user.isFirstTimePosting
    ) {
      disableFirstTimePosting();
      this.setState({
        isModalVisible: true,
        alertMessage: 'Congratulations!!! it\'s your first time posting.'
      });

      // alert('Congratulations!!! it\'s your first time posting.');
    }
    this.setState({
      hasPost: true
    });
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

  handleComment = event => {
    const { onGetStrikesCountOfAUser, user } = this.props;
    const { isStudent, id } = user.user;
    onGetStrikesCountOfAUser({ isStudent, id });
    const { value } = event.target;
    if (value[value.length - 1] === '@' && value[value.length - 1] === ' ') {
      console.log('show users');
    }
    const { strike } = this.props;
    if (value.trim().length > 500) {
      this.setState({
        isModalVisible: true,
        alertMessage: 'Please keep the length within 500 characters'
      });
      // alert('Please keep the length within 500 characters');
      this.setState({ commentText: value, hasPost: value.trim().length > 0 });
    } else {
      const blacklistedWord = FilterKeyWords(value);
      if (blacklistedWord) {
        if (strike.strikes >= 10) {
          console.log('block the student');
          this.setState({ blockUser: true });
          // onBlockUser({ isStudent, id });
        } else {
          let index = strike.strikes < 10 && (strike.strikes % strikeCount) + 1;
          index -= 1;
          this.setState({
            isModalVisible: true,
            alertMessage: `${warnings[index]}`
          });
        }
        this.setState({ isBad: true, strikeType: blacklistedWord });
      } else {
        this.setState({
          isModalVisible: false,
          alertMessage: null
        });
      }
      this.setState({ commentText: event.target.value });
    }
  };

  handleCommentReply = () => {
    const { commentText, isBad } = this.state;
    const { onSubmitComment, user, data } = this.props;
    const { p_id } = data;
    const comment = {
      pc_p_id: p_id,
      pc_is_student: user.user.isStudent,
      pc_commentator_id: user.user.id,
      pc_title: 'Comment',
      pc_body: commentText,
      isBad
    };
    if (commentText.trim().length > 0 && commentText.trim().length < 500) {
      onSubmitComment(comment);
      this.setState({ commentText: '' });
    } else {
      this.setState({
        isModalVisible: true,
        alertMessage: 'The comment should not exceed 500 characters.'
      });
    }
  };

  render() {
    const { commentText, isModalVisible, alertMessage } = this.state;
    return (
      <div>
        <CommentBoxWrapper>
          <Image src={Images.stockImage} />
          <FormInput
            placeholder="Write a comment"
            onChange={this.handleComment}
            onKeyDown={this.handleKeyDown}
            onFocus={this.showHasPost}
            style={{ height: '24px', marginLeft: '6px', marginBottom: 0 }}
            value={commentText}
          />
          <button onClick={this.handleCommentReply}>
            <FaCaretRight />
          </button>
        </CommentBoxWrapper>
        {isModalVisible && (
          <Modal message={alertMessage} hideModal={this.hideModal} />
        )}
      </div>
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentBox);
