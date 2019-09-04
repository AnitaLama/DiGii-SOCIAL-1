//  THE TOP PART OF EACH SINGLE POST
// WHERE THE AUTHOR INFO IS SHOWN + THE EDIT OPTIONS DROPSOWN

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { connect } from 'react-redux';
import { IconContext } from 'react-icons';
import { FaEllipsisH, FaTimes, FaTimesCircle } from 'react-icons/fa';
import PostAction from '../../Redux/PostRedux';
import { Avatar, ReportModal } from '../StyledComponents';
import {
  flex, fontSize, fontWeight, fontFilson, Colors
} from '../../Theme';
import { FeelingsList } from '../Functions';
import { EditModal, DeleteModal } from './index';
import ReportAction from '../../Redux/ReportRedux';

// const { grey } = Colors.colors;

const { snow, light, tint } = Colors.colors;
const AuthorWrapper = styled.div`
  ${flex()};
`;
const AuthorInfo = styled.div`
  margin: auto 0;
  padding: 0 10px;
`;
const Name = styled.div`
  ${fontWeight('bold')};
  ${fontFilson()};
  text-transform: capitalize;
  span.emoji {
    font-family: 'Segoe UI Emoji';
    font-family: Lato;
    color: ${light};
    ${fontSize(14)};
    text-transform: none;
  }
`;
// const Post = styled.div`
//   ${fontSize(14)};
//   color: ${grey};
// `;
const TaggedList = styled.span`
  span {
    font-family: Lato;
    color: ${light};
    ${fontSize(14)};
    text-transform: none;
    &::after {
      content: ', ';
    }
  }
  span:first-of-type {
    &::before {
      content: ' with ';
    }
  }
  span:last-of-type {
    &::after {
      content: '';
    }
  }
`;

const EditOptionsContainer = styled.div`
  text-align: right;
  position: absolute;
  top: 0;
  right: 0px;
  z-index: 1;
  background: transparent;
`;
const EditOptionsWrapper = styled.div`
  text-align: left;
  background: ${snow};
  margin: 12px;
  div {
    margin-right: 20px;
    svg {
      margin-right: 6px;
      color: #61bbf7;
    }
    cursor: pointer;
  }
  div:first-of-type {
    margin-right: 0px;
    background: transparent;
    text-align: right;
    cursor: pointer;
    svg {
      color: ${tint};
    }
  }
  padding: 4px 4px 4px 10px;
  border-radius: 12px;
  box-shadow: 3px 3px 5px 2px rgba(0, 0, 0, 0.25);
`;

const PostOptionButton = styled.div``;

class Author extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      showDeleteModal: false,
      selectedPost: {},
      showEditModal: false,
      showReportModal: false
    };
  }

  getExtraInfo = () => {
    const { data } = this.props;
    const { post_type, postText, notifications } = data;
    const type = (post_type && post_type.postTypeTitle) || '';
    const emoji = type === 'feeling' && FeelingsList.find(item => item.name === postText);
    if (type === 'feeling') {
      return (
        emoji && (
          <span className="emoji">
            {` is feeling ${postText} ${emoji.emoji}`}
          </span>
        )
      );
    }
    if (type === 'tag') {
      return (
        <TaggedList>
          {notifications.map((item, i) => {
            const { notificationIsStudent, student, user } = item;
            if (notificationIsStudent) {
              return (
                <span key={`${item}-${student}-${i}`}>
                  {student.studentUsername}
                </span>
              );
            }
            return <span key={`${item}-${user}-${i}`}>{user.userName}</span>;
          })}
        </TaggedList>
      );
    }
  };

  onPostChange = () => {
    const { open } = this.state;
    this.setState({ open: !open });
  };

  closeDeleteModal = () => {
    this.setState({ showDeleteModal: false });
  };

  deletePost = post => {
    this.setState({ showDeleteModal: true, selectedPost: post, open: false });
  };

  closeEditModal = () => {
    this.setState({ showEditModal: false });
  };

  editPost = post => {
    this.setState({
      showEditModal: true,
      selectedPost: post,
      open: false
    });
  };

  onPostChangepopup = data => (
    <EditOptionsWrapper>
      <div>
        <FaTimes onClick={this.onPostChange} />
      </div>
      <PostOptionButton
        onClick={() => {
          this.editPost(data);
        }}
      >
        <FaEllipsisH />
        Edit
      </PostOptionButton>
      <PostOptionButton
        onClick={() => {
          this.deletePost(data);
        }}
      >
        <FaTimes />
        Delete
      </PostOptionButton>
    </EditOptionsWrapper>
  );

  onDeletePost = posts => {
    const { onDelete, post } = this.props;
    const { page, pageSize } = post;
    onDelete(posts);
    this.setState({ showDeleteModal: false });
  };

  onEditPost = post => {
    const { onEditPost, users } = this.props;
    const { isStudent, id } = users;
    onEditPost({ ...post, isStudent, id });
    this.setState({ showEditModal: false });
  };

  onReport = () => {
    this.setState({ showReportModal: true });
  };

  selectReason = reason => {
    this.setState({ reportReason: reason });
  };

  reportThePost = () => {};

  hideReportModal = () => {
    this.setState({ showReportModal: false });
  };

  makeTheReport = () => {
    const { users, data, onMakeTheReport } = this.props;
    const { reportReason } = this.state;
    const report = {
      reportType: 'help',
      reportReporterId: users.id,
      reportReason,
      reportArticleId: data.postId
    };
    this.hideReportModal();
    onMakeTheReport(report);
  };

  render() {
    const { data, users } = this.props;
    const { isStudent, id } = users;
    const { postActorId, postIsStudent } = data;
    let firstname = '';
    let lastname = '';
    let userAvatar = null;
    if (data.postIsStudent) {
      const { student } = data;
      const { avatar } = student;
      firstname = student.studentFirstname;
      lastname = student.studentLastname;
      userAvatar = avatar;
    } else {
      const { user } = data;
      const { user_profile, avatar } = user;
      const { userProfileFirstname, userProfileLastname } = user_profile;
      firstname = userProfileFirstname;
      lastname = userProfileLastname;
      userAvatar = avatar;
    }
    const {
      showDeleteModal,
      selectedPost,
      showEditModal,
      showReportModal
    } = this.state;
    const check = postActorId === id && postIsStudent == isStudent;
    const { open } = this.state;
    return (
      <AuthorWrapper>
        <Avatar avatar={userAvatar} height={53} />
        <AuthorInfo>
          <Name>
            {firstname}
            {' '}
            {lastname}
            {' '}
            {this.getExtraInfo()}
          </Name>
          {' '}
          {/* <Post>{this.getContent()}</Post>
            <PostedDate>{postDate}</PostedDate> */}
        </AuthorInfo>
        {/* Edit And Delete */}
        {check && (
          <EditOptionsContainer>
            {open ? (
              this.onPostChangepopup(data)
            ) : (
              <IconContext.Provider
                value={{
                  color: tint,
                  className: 'global-class-name'
                }}
              >
                <button
                  type="submit"
                  className="dropbtn"
                  onClick={this.onPostChange}
                  style={{
                    backgroundColor: 'transparent',
                    border: 0,
                    outline: 0,
                    padding: '12px'
                  }}
                >
                  <FaTimesCircle />
                </button>
              </IconContext.Provider>
            )}
          </EditOptionsContainer>
        )}
        {!check && (
          <EditOptionsContainer>
            <button
              type="submit"
              className="dropbtn"
              onClick={this.onReport}
              style={{
                backgroundColor: 'transparent',
                border: 0,
                outline: 0,
                padding: '12px'
              }}
            >
              <FaTimesCircle />
            </button>
          </EditOptionsContainer>
        )}
        {showDeleteModal && (
          <DeleteModal
            closeDeleteModal={this.closeDeleteModal}
            post={selectedPost}
            user={users}
            onDeletePost={this.onDeletePost}
          />
        )}
        {showEditModal && (
          <EditModal
            closeEditModal={this.closeEditModal}
            post={selectedPost}
            user={users}
            onEditPost={this.onEditPost}
          />
        )}
        {showReportModal && (
          <ReportModal
            selectReason={this.selectReason}
            reportThePost={this.reportThePost}
            hideModal={this.hideReportModal}
            makeTheReport={this.makeTheReport}
          />
        )}
      </AuthorWrapper>
    );
  }
}
Author.propTypes = {
  data: PropTypes.object,
  users: PropTypes.object,
  onDelete: PropTypes.func,
  onEditPost: PropTypes.func
};
const mapStateToProps = state => ({
  users: state.user.user,
  post: state.post
});
const mapDispatchToProps = dispatch => ({
  onDelete: value => dispatch(PostAction.onPostDelete(value)),
  onEditPost: value => dispatch(PostAction.onEditPost(value)),
  onMakeTheReport: value => dispatch(ReportAction.onReportTheArticle(value))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Author);
