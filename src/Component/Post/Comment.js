import React, { Component } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { FaTimesCircle } from 'react-icons/fa';
import {
  Images, flex, fontSize, fontWeight, Colors
} from '../../Theme';
import { Avatar } from '../StyledComponents';

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

  hideComment = () => {
    this.setState({ isCommentHidden: true });
  };

  render() {
    const { isCommentHidden } = this.state;
    const { data } = this.props;

    let firstname = '';
    let lastname = '';
    console.log(data);
    if (data.pc_is_student) {
      const { student } = data;
      firstname = student.st_firstname || '';
      lastname = student.st_lastname || '';
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
            {firstname}
            {' '}
            {lastname}
          </span>
          <Close onClick={this.hideComment}>
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
export default Comment;
