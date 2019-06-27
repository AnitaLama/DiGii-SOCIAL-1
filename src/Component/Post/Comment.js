import React, { Component } from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { Images, flex, fontSize } from "../../Theme";

const CommentWrapper = styled.div`
  ${flex};
  padding: 8px;
`;
const Avatar = styled.img`
  border-radius: 12px;
  height: 24px;
  margin-right: 5px;
`;
const CommentDiv = styled.div`
  ${flex("column")};
  span:first-of-type {
    font-weight: bold;
  }
  span:not(:first-of-type) {
    ${fontSize(12)};
  }
  span.date {
    ${fontSize(10)};
  }
`;
class Comment extends Component {
  render() {
    const { data } = this.props;
    const { createdAt, user } = data;
    return (
      <CommentWrapper>
        <Avatar src={Images.stockImage} />
        <CommentDiv>
          <span>
            {user.firstName} {user.lastName}
          </span>
          <span className="date">
            {new Date(createdAt).toLocaleDateString()}
          </span>
          <span>{data.commentDescription}</span>
        </CommentDiv>
      </CommentWrapper>
    );
  }
}

Comment.propTypes = {
  data: PropTypes.object
};
export default Comment;
