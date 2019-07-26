import React, { Component } from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { FaTimesCircle } from "react-icons/fa";
import { Images, flex, fontSize, fontWeight, Colors } from "../../Theme";
import { Avatar } from "../StyledComponents";
import { connect } from "react-redux";
import PostAction from "../../Redux/PostRedux";

const { grey, pink } = Colors.colors;
const CommentWrapper = styled.div`
  ${flex};
  padding: 8px 0;
  width: 100%;
`;

const CommentDiv = styled.div`
  ${flex("column")};
  position: relative;
  width: 100%;
  span:first-of-type {
    ${fontWeight("bold")};
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
  span {
    text-transform: capitalize;
  }
`;
const Close = styled.div`
  position: absolute;
  right: 0;
  color: ${pink};
  cursor: pointer;
  svg {
    ${fontSize(24)};
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

  render() {
    const { isCommentHidden } = this.state;
    const { data, comment, user } = this.props;
    const { pc_id } = data;
    const { isStudent, id } = user.user;

    let firstname = "";
    let lastname = "";
    if (data.pc_is_student) {
      const { student } = data;
      firstname = student.st_firstname || "";
      lastname = student.st_lastname || "";
    } else {
      const { user } = data;
      const { user_profile } = user;
      const { up_firstname, up_lastname } = user_profile;
      firstname = up_firstname;
      lastname = up_lastname;
    }

    return !isCommentHidden ? (
      <CommentWrapper>
        <Avatar src={Images.stockImage} height={24} rightMargin={6} />
        <CommentDiv>
          <span>
            {firstname} {lastname}
          </span>
          {/* Hide/Edit/Delete comment  */}
          <Close onClick={() => this.hideComment({ pc_id, isStudent, id })}>
            <FaTimesCircle />
          </Close>
          {/* <span className="date">
            {new Date(createdAt).toLocaleDateString()}
          </span> */}
          <span>{data.pc_body}</span>
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
