import React, { Component } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { FaTimes } from 'react-icons/fa';
import { connect } from 'react-redux';
import { flex, fontSize, fontWeight, Colors } from '../../Theme';
import { Avatar } from '../StyledComponents';
import PostAction from '../../Redux/PostRedux';

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

  render() {
    const { isCommentHidden } = this.state;
    const { data, user } = this.props;
    const { pc_id } = data;
    const { isStudent, id } = user.user;

    let firstname = '';
    let lastname = '';
    let userAvatar = null;
    if (data.pc_is_student) {
      const { student } = data;
      const { avatar } = student;
      firstname = student.st_firstname || '';
      lastname = student.st_lastname || '';
      userAvatar = avatar;
    } else {
      const { user } = data;
      const { user_profile, avatar } = user;
      const { up_firstname, up_lastname } = user_profile;
      firstname = up_firstname;
      lastname = up_lastname;
      userAvatar = avatar;
    }
    // {userAvatar ? (
    //   <UserAvatar
    //     avatar={userAvatar}
    //     height={24}
    //     style={{ marginRight: '6px' }}
    //   />
    // ) : (
    //   <Avatar
    //     src={Images.stockImage}
    //     height={24}
    //     style={{ marginRight: '6px' }}
    //   />
    // )}
    return !isCommentHidden ? (
      <CommentWrapper>
        <Avatar
          avatar={userAvatar}
          height={24}
          style={{ marginRight: '6px' }}
        />

        <CommentDiv>
          <span className="name">
            {firstname} {lastname}
          </span>
          {/* Hide/Edit/Delete comment  */}
          <Close onClick={() => this.hideComment({ pc_id, isStudent, id })}>
            <FaTimes />
          </Close>
          {/* <span className="date">
            {new Date(createdAt).toLocaleDateString()}
          </span> */}
          <span>
            {data.pc_image_path ? (
              <img src={data.pc_image_path} />
            ) : (
              data.pc_body
            )}
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
