import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import { FaCaretRight } from 'react-icons/fa';
import { Images } from '../../Theme';
import { FormInput } from '../StyledComponents';
import CommentActions from '../../Redux/CommentRedux';

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
      commentText: ''
    };
  }

  handleComment = event => {
    this.setState({ commentText: event.target.value });
  };

  handleCommentReply = event => {
    event.preventDefault();
    const { commentText } = this.state;
    const { onSubmitComment, post, user } = this.props;
    const { p_id } = post;
    const comment = {
      pc_p_id: p_id,
      pc_is_student: user.user.isStudent,
      pc_commentator_id: user.user.id,
      pc_title: 'Comment',
      pc_body: commentText
    };
    this.setState({ commentText: '' });
    onSubmitComment(comment);
  };

  render() {
    return (
      <CommentBoxWrapper>
        <Image src={Images.stockImage} />
        <FormInput
          placeholder="Write a comment"
          onChange={this.handleComment}
          style={{ height: '24px', marginLeft: '6px', marginBottom: 0 }}
          value={this.state.commentText}
        />
        <button onClick={this.handleCommentReply}>
          <FaCaretRight />
        </button>
      </CommentBoxWrapper>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  onSubmitComment: value => dispatch(CommentActions.onSubmitCommentRequest(value))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentBox);
