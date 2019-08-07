import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { connect } from 'react-redux';
import { IconContext } from 'react-icons';
import { FaEllipsisH, FaTimes, FaTimesCircle } from 'react-icons/fa';
import PostAction from '../../Redux/PostRedux';
import { Avatar, DeleteModal, EditModal } from '../StyledComponents';
import {
  flex, fontSize, fontWeight, fontFilson, Colors
} from '../../Theme';
import { FeelingsList } from '../NewPost/index';
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
class Author extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      showDeleteModal: false,
      selectedPost: {},
      showEditModal: false
    };
  }

  getExtraInfo = () => {
    const { data } = this.props;
    const { post_type, p_text, notifications } = data;
    const type = post_type.pt_title;
    const emoji = type === 'feeling' && FeelingsList.find(item => item.name === p_text);
    if (type === 'feeling') {
      return (
        emoji && (
          <span className="emoji">
            {` is feeling ${p_text} ${emoji.emoji}`}
          </span>
        )
      );
    }
    if (type === 'tag') {
      return (
        <TaggedList>
          {notifications.map((item, i) => {
            const { n_is_student, student, user } = item;
            if (n_is_student) {
              return (
                <span key={`${item}-${student}-${i}`}>
                  {student.st_username}
                </span>
              );
            }
            return <span key={`${item}-${user}-${i}`}>{user.u_name}</span>;
          })}
        </TaggedList>
      );
    }
  };

  onPostChange = () => {
    this.setState({ open: !this.state.open });
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
      <div
        onClick={() => {
          this.editPost(data);
          // this.props.onDelete(value);
        }}
      >
        <FaEllipsisH />
        Edit
      </div>
      <div
        onClick={() => {
          this.deletePost(data);
        }}
      >
        <FaTimes />
        Delete
      </div>
    </EditOptionsWrapper>
  );

  onDeletePost = post => {
    const { onDelete } = this.props;
    onDelete(post);
    this.setState({ showDeleteModal: false });
  };

  onEditPost = post => {
    const { onEditPost, user } = this.props;
    const { isStudent, id } = user.user;
    onEditPost({ ...post, isStudent, id });
    this.setState({ showEditModal: false });
  };

  render() {
    const { data } = this.props;
    const { user } = this.props;
    const { isStudent, id } = user.user;
    const { p_actor_id, p_isStudent } = data;
    let firstname = '';
    let lastname = '';
    let userAvatar = null;
    // console.log(data);
    // post typet,po ypepost console.log('data author', data);
    if (data.p_isStudent) {
      const { student } = data;
      const { avatar } = student;
      firstname = student.st_firstname;
      lastname = student.st_lastname;
      userAvatar = avatar;
    } else {
      const { user } = data;
      const { user_profile, avatar } = user;
      const { up_firstname, up_lastname } = user_profile;
      firstname = up_firstname;
      lastname = up_lastname;
      userAvatar = avatar;
    }
    const { showDeleteModal, selectedPost, showEditModal } = this.state;
    const check = p_actor_id === id && p_isStudent == isStudent;

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
            {this.state.open ? (
              this.onPostChangepopup(data)
            ) : (
              <IconContext.Provider
                value={{
                  color: tint,
                  className: 'global-class-name'
                }}
              >
                <button
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
        {showDeleteModal && (
          <DeleteModal
            closeDeleteModal={this.closeDeleteModal}
            post={selectedPost}
            user={user.user}
            onDeletePost={this.onDeletePost}
          />
        )}
        {showEditModal && (
          <EditModal
            closeEditModal={this.closeEditModal}
            post={selectedPost}
            user={user.user}
            onEditPost={this.onEditPost}
          />
        )}
      </AuthorWrapper>
    );
  }
}
Author.propTypes = {
  data: PropTypes.object
};
const mapStateToProps = state => ({
  user: state.user
});
const mapDispatchToProps = dispatch => ({
  onDelete: value => dispatch(PostAction.onPostDelete(value)),
  onEditPost: value => dispatch(PostAction.onEditPost(value))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Author);
