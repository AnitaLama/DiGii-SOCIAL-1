// THIS IS THE SECTION WHERE THE COMMENTS ARE SHOWN

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FaTimes } from 'react-icons/fa';
import { connect } from 'react-redux';

import { Avatar } from '../../StyledComponents';
import PostAction from '../../../Redux/PostRedux';
import { FeelingsList } from '../../Functions';
import { CommentWrapper, CommentDiv, Close } from './style';

class Comment extends Component {
  constructor() {
    super();
    this.state = {
      isCommentHidden: false
    };
  }

  hideComment = value => {
    const { onDelete } = this.props;
    this.setState({ isCommentHidden: true });
    onDelete(value);
  };

  getEmoji = data => {
    const feeling = FeelingsList.find(item => item.name === data);
    return ` ${feeling.emoji}`;
  };

  render() {
    const { isCommentHidden } = this.state;
    const { data, users } = this.props;
    const { postCommentId } = data;
    const { isStudent, id } = users;

    let firstname = '';
    let lastname = '';
    let userAvatar = null;
    if (data.postCommentIsStudent) {
      const { student } = data;
      const { avatar } = student;
      firstname = student.studentFirstname || '';
      lastname = student.studentLastname || '';
      userAvatar = avatar;
    } else {
      const { user } = data;
      const { user_profile, avatar } = user;
      const { userProfileFirstname, userProfileLastname } = user_profile;
      firstname = userProfileFirstname;
      lastname = userProfileLastname;
      userAvatar = avatar;
    }
    const { postCommentCommentatorId, postCommentIsStudent } = data;
    const checkIfCanBeDeleted = postCommentIsStudent == isStudent && postCommentCommentatorId === id;
    return !isCommentHidden ? (
      <CommentWrapper>
        <Avatar
          avatar={userAvatar}
          height={24}
          style={{ marginRight: '6px' }}
        />

        <CommentDiv>
          <span className="name">
            {firstname}
            {' '}
            {lastname}
          </span>
          {/* Hide/Edit/Delete comment  */}
          {checkIfCanBeDeleted && (
            <Close
              onClick={() => this.hideComment({ postCommentId, isStudent, id })}
            >
              <FaTimes />
            </Close>
          )}
          {/* <span className="date">
            {new Date(createdAt).toLocaleDateString()}
          </span> */}
          <span>
            {data.postCommentImagePath && (
              <img
                src={data.postCommentImagePath}
                alt={data.postCommentImagePath}
              />
            )}
            {data.postCommentTitle.toLowerCase() !== 'feeling'
              && data.postCommentBody}
          </span>
          <span>
            {data.postCommentTitle.toLowerCase() === 'feeling'
              && `is feeling ${data.postCommentBody} ${this.getEmoji(
                data.postCommentBody
              )}`}
          </span>
        </CommentDiv>
      </CommentWrapper>
    ) : (
      <div />
    );
  }
}

Comment.propTypes = {
  data: PropTypes.object,
  users: PropTypes.object,
  onDelete: PropTypes.func
};

const mapStateToProps = state => ({
  comment: state.comment,
  users: state.user.user
});

const mapDispatchToProps = dispatch => ({
  onDelete: value => dispatch(PostAction.onCommentDelete(value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comment);
