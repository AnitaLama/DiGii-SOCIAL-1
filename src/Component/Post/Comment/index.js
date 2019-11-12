// THIS IS THE SECTION WHERE THE COMMENTS ARE SHOWN

import React, { Component } from "react";
import PropTypes from "prop-types";
import { FaTimes } from "react-icons/fa";
import { connect } from "react-redux";

import { Avatar } from "../../StyledComponents";
import PostAction from "../../../Redux/PostRedux";
import CommentAction from "../../../Redux/CommentRedux";
import { FeelingsList } from "../../Functions";
import {
  CommentWrapper,
  CommentDiv,
  Close,
  CommentContent,
  CommentReactionWrapper,
  CommentReactionContainer
} from "./style";
import { LikeReaction, ReactionCount } from "../PostActivity";

// const { onCommentDelete, onReactToAComment } = PostAction;

class Comment extends Component {
  state = {
    isCommentHidden: false,
    showReactionList: false
  };

  hideComment = value => {
    const { onDelete } = this.props;
    this.setState({ isCommentHidden: true });
    onDelete(value);
  };

  getEmoji = data => {
    const feeling = FeelingsList.find(item => item.name === data);
    return ` ${feeling.emoji}`;
  };

  handleReactionClick = reaction => {
    const { data, users, onReactToAComment } = this.props;
    const { isStudent, id } = users;
    const { postCommentPostId, postCommentId } = data;
    const postActivity = {
      postActivityPostId: postCommentPostId,
      postActivityPostCommentId: postCommentId,
      postActivityActivityTypeId: reaction.id,
      postActivityIsStudent: isStudent,
      postActivityActorId: id
    };
    onReactToAComment(postActivity);
  };

  showReactions = () => {
    this.setState({ showReactionList: true });
  };

  hideReactions = () => {
    this.setState({ showReactionList: false });
  };

  render() {
    const { isCommentHidden } = this.state;
    const { data, users } = this.props;
    const { postCommentId } = data;
    const { isStudent, id } = users;

    let firstname = "";
    let lastname = "";
    let userAvatar = null;
    if (data.postCommentIsStudent) {
      const { student } = data;
      const { avatar } = student;
      firstname = student.studentFirstname || "";
      lastname = student.studentLastname || "";
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
    const checkIfCanBeDeleted =
      postCommentIsStudent == isStudent && postCommentCommentatorId === id;
    return !isCommentHidden ? (
      <CommentWrapper>
        <Avatar
          avatar={userAvatar}
          height={30}
          style={{ marginRight: "6px" }}
        />

        <CommentDiv>
          <span className="name">
            {firstname} {lastname}
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
          <CommentContent>
            {data.postCommentImagePath && (
              <img
                src={data.postCommentImagePath}
                alt={data.postCommentImagePath}
              />
            )}
            {data.postCommentTitle.toLowerCase() !== "feeling" &&
              data.postCommentBody}
          </CommentContent>
          <span>
            {data.postCommentTitle.toLowerCase() === "feeling" &&
              `is feeling ${data.postCommentBody} ${this.getEmoji(
                data.postCommentBody
              )}`}
          </span>

          <CommentReactionWrapper tabIndex="-5" onClick={this.showReactions}>
            <CommentReactionContainer>
              <LikeReaction
                handleReactionClick={this.handleReactionClick}
                {...this.state}
              />
            </CommentReactionContainer>
            <ReactionCount {...this.props} />
          </CommentReactionWrapper>
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
  onDelete: value => dispatch(PostAction.onCommentDelete(value)),
  onReactToAComment: value => dispatch(CommentAction.onReactToAComment(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
