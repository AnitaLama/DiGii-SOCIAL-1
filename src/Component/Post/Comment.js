import React, { Component } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { FaTimes } from 'react-icons/fa';
import { connect } from 'react-redux';
import {
  flex, fontSize, fontWeight, Colors
} from '../../Theme';
import { Avatar } from '../StyledComponents';
import PostAction from '../../Redux/PostRedux';
import { FeelingsList } from '../Functions';

const { grey, pink } = Colors.colors;
const CommentWrapper = styled.div`
  ${flex};
  padding: 8px 0;
  width: 100%;
`;

const CommentDiv = styled.div`
  ${flex('column')};
  position: relative;
  width: 100%;
  span:first-of-type {
    ${fontWeight('bold')};
  }
  span:not(:first-of-type) {
    ${fontSize(12)};
  }
  span.date {
    ${fontSize(10)};
  }
  span:last-of-type {
    color: ${grey};
  }
  span.name {
    text-transform: capitalize;
  }
  img {
    height: 50px;
  }
  span.emoji {
    font-family: Segoe UI Emoji;
  }
`;
const Close = styled.div`
  position: absolute;
  right: 0;
  color: ${pink};
  cursor: pointer;
  svg {
    ${fontSize(9)};
  }
`;
class Comment extends Component {
  constructor() {
    super();
    this.state = {
      isCommentHidden: false
    };
  }

  hideComment = value => {
    this.setState({ isCommentHidden: true });
    this.props.onDelete(value);
  };

  getEmoji = data => {
    const feeling = FeelingsList.find(item => item.name === data);
    return ` ${feeling.emoji}`;
  };

  render() {
    const { isCommentHidden } = this.state;
    const { data, user } = this.props;
    const { postCommentId } = data;
    const { isStudent, id } = user.user;

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
              <img src={data.postCommentImagePath} />
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
  data: PropTypes.object
};

const mapStateToProps = state => ({
  comment: state.comment,
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  onDelete: value => dispatch(PostAction.onCommentDelete(value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comment);
