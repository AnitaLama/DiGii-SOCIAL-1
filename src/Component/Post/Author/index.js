//  THE TOP PART OF EACH SINGLE POST
// WHERE THE AUTHOR INFO IS SHOWN + THE EDIT OPTIONS DROPSOWN

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { IconContext } from 'react-icons';
import { FaEllipsisH, FaTimes, FaTimesCircle } from 'react-icons/fa';
import PostAction from '../../../Redux/PostRedux';
import {
  Avatar,
  ReportModal,
  DeleteModal,
  EditModal
} from '../../StyledComponents';

import { FeelingsList } from '../../Functions';
// import { EditModal } from '../index';
import ReportAction from '../../../Redux/ReportRedux';
import {
  AuthorWrapper,
  AuthorInfo,
  Name,
  TaggedList,
  EditOptionsContainer,
  EditOptionsWrapper,
  PostOptionButton
} from './style';
import { Colors } from '../../../Theme';

const { tint } = Colors.colors;

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

  getUserName = user => {
    const nameOfUser = user.taggedUserIsStudent
      ? user.user.userNmae
      : user.student.studentFirstname;
    return <span>{nameOfUser}</span>;
  };

  getExtraInfo = () => {
    const { data } = this.props;
    const {
      postFeeling, postText, notifications, tagged_users
    } = data;
    // const type = (post_type && post_type.postTypeTitle) || '';
    const emoji = postFeeling && FeelingsList.find(item => item.name === postFeeling);
    return (
      <span>
        {postFeeling && emoji && (
          <span className="emoji">
            {` is feeling ${postFeeling} ${emoji.emoji}`}
          </span>
        )}
        {tagged_users && tagged_users.length > 0 && (
          <span className="emoji">
            {' '}
            with
            {' '}
            {tagged_users.slice(0, 2).map(user => {
              const nameOfUser = user.taggedUserIsStudent
                ? user.user.userName
                : user.student.studentFirstname;
              return (
                <span className="userList" key={nameOfUser}>
                  {nameOfUser}
                </span>
              );
            })}
            {tagged_users.length > 2 && (
              <span>
                {' '}
                and
                {tagged_users.length - 2}
                {' '}
others
              </span>
            )}
          </span>
        )}
      </span>
    );
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
  onEditPost: PropTypes.func,
  reportAnArticle: PropTypes.func
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
