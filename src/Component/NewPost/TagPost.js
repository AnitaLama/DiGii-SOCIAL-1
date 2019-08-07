import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import { Tag } from 'antd';
import { FormTextArea, Button, Loader } from '../StyledComponents';
import GroupActions from '../../Redux/GroupRedux';
import PostActions from '../../Redux/PostRedux';
import { Colors, boxShadow } from '../../Theme';
import StrikeActions from '../../Redux/StrikeRedux';
import { PostWrapper } from './index';
import LoginActions from '../../Redux/LoginRedux';
import Moderator from './Moderator';

const {
  primary, blue, grey, snow, secondary
} = Colors.colors;

const ChipContainer = styled.div`
  position: relative;
  input{
    z-index: 1000,
    background: transparent;
    outline:0

  }
`;
const ChipsWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  color: ${blue};
`;
const PostWrapperContainer = styled.div`
  // position: relative;
`;
const UserListWrapper = styled.div`
  position: relative;
  margin-left: -53px;
  span {
    color: ${blue};
    &::after {
      content: ',';
    }
  }
  span:last-of-type {
    &::after {
      content: '';
    }
  }
`;
const UserList = styled.ul`
  border: 1px solid ${grey};
  ${boxShadow()};
  background: ${snow};
  position: absolute;
  overflow-y: scroll;
  height: 130px;
  list-style-type: none;
  padding: 0;
  margin: 0;

  left: 0;
  min-width: 150px;
  li {
    padding: 4px 10px;
    &:hover {
      cursor: pointer;
      background-image: linear-gradient(to right, ${primary}, ${secondary});
      color: ${snow};
    }
  }
`;

class TagPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.username,
      postTypeId: props.postTypeId,
      text: '',
      hasTaggedFriends: false,
      showUsers: false,
      taggedUsers: [],
      users: [],
      isModalVisible: false,
      alertMessage: null,
      blockUser: false
    };
  }

  componentWillMount() {
    const { onGetStrikesCountOfAUser, user } = this.props;
    const { isStudent, id } = user.user;
    onGetStrikesCountOfAUser({ isStudent, id });
  }

  componentDidMount() {
    const { user, onGetAllUsersOfAGroup, group } = this.props;
    const { groupId } = user.user;
    const { users } = group;
    onGetAllUsersOfAGroup(groupId);
    this.setState({ users });
  }

  handleKeyDown = event => {
    // const start = event.target.selectionStart;
    // const end = event.target.selectionEnd;
    // console.log(start, end);
  };

  hideModal = () => {
    this.setState({
      isModalVisible: false,
      alertMessage: null
    });
  };

  onFocus = () => {
    const {
      user, disableFirstTimePosting, post, onFocus
    } = this.props;
    const { posts } = post;
    const { id, isFirstTimePosting } = user.user;
    const checkFirstTimePosting = onFocus(posts, id);

    if (checkFirstTimePosting && isFirstTimePosting) {
      disableFirstTimePosting();
    }
  };

  handleTextChange = e => {
    const { handlePostText } = this.props;
    handlePostText(e);
  };

  onFocus = () => {
    const { group } = this.props;

    this.setState({ showUsers: group.users.length > 0 });
  };

  onBlur = () => {
    this.setState({ showUsers: false });
  };

  finishedTagging = () => {
    const {
      submitPost,
      strike,
      user,
      onBlockUser,
      postText,
      onSubmitTagPost,
      showWarning,
      resetPostType,
      onGetStrikesCountOfAUser
    } = this.props;
    const { postTypeId, taggedUsers } = this.state;
    const { isStudent, id } = user.user;
    const { strikes } = strike;
    const result = submitPost();
    onGetStrikesCountOfAUser({ isStudent, id });

    let isBad = 0;
    if (result) {
      if (strikes > 8 && isStudent) {
        // BLOCK THE USER
        onBlockUser({ isStudent, id });
      }
      showWarning(strikes, isStudent);
      isBad = 1;
    }

    const data = {
      p_pt_id: postTypeId,
      p_isStudent: isStudent,
      p_actor_id: id,
      p_text: postText,
      taggedUsers,
      p_is_bad: isBad,
      isBad,
      str_type: result,
      str_is_student: user.user.isStudent,
      str_actor_id: user.user.id
    };
    onSubmitTagPost(data);

    resetPostType();
  };

  selectUser = user => {
    const { users } = this.state;
    const newArr = [];
    users.map(item => {
      if (
        item.u_name !== user.u_name
        || item.st_username !== user.st_username
      ) {
        newArr.push(item);
      }
      return true;
    });
    const data = {
      userName: user.u_name || user.st_username,
      isStudent: !!user.st_username,
      id: user.u_id || user.st_id
    };
    this.setState(prevState => ({
      taggedUsers: [...prevState.taggedUsers, data],
      users: newArr,
      showUsers: false
    }));
  };

  remove = user => {
    const { taggedUsers } = this.state;
    const { group } = this.props;
    const removedUser = group.users.find(
      item => item.u_name === user || item.st_username === user
    );
    const newArr = taggedUsers.filter(item => item !== user && item !== user);
    this.setState(prevState => ({
      users: [...prevState.users, removedUser],
      taggedUsers: newArr
    }));
  };

  render() {
    const { showUsers, taggedUsers, users } = this.state;
    const { post } = this.props;
    return (
      <PostWrapperContainer>
        <PostWrapper>
          <FormTextArea
            placeholder="Tag your friends"
            onChange={this.handleTextChange}
            onKeyDown={this.handleKeyDown}
            ref={r => (this.textarea = r)}
            onFocus={this.onFocus}
          />
          <div>
            <Button className="rounded small" onClick={this.finishedTagging}>
              {!post.posting ? 'Post' : <Loader />}
            </Button>
          </div>
        </PostWrapper>
        <UserListWrapper>
          <div>
            {/* ---------SHOW USERS-----------------*/}
            with -
            {taggedUsers.map((user, i) => (
              <span key={`${user}${i}`}>
                {' '}
                {user.userName}
              </span>
            ))}
          </div>
          {/* ---------SHOW USERS IN CHIPS-----------------*/}

          <ChipContainer>
            <input
              onFocus={() => {
                this.setState({ showUsers: true });
              }}
            />
            <ChipsWrapper>
              {taggedUsers.map((user, i) => (
                <Tag
                  onClick={() => {
                    this.remove(user);
                  }}
                  key={`${i}${user}`}
                >
                  {user.userName}
                  {' '}
x
                </Tag>
              ))}
            </ChipsWrapper>
          </ChipContainer>
          {/* ---------LIST OF USERS IN THAT GROUP-----------------*/}

          {showUsers && (
            <UserList>
              {users.map((item, i) => (
                <li
                  key={`${item}${i}`}
                  onClick={() => {
                    this.selectUser(item);
                  }}
                >
                  {item.u_name || item.st_username}
                </li>
              ))}
            </UserList>
          )}
        </UserListWrapper>
      </PostWrapperContainer>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  group: state.group,
  strike: state.strike,
  postActivity: state.postActivity,
  post: state.post
});

const mapDispatchToProps = dispatch => ({
  onGetAllUsersOfAGroup: value => dispatch(GroupActions.onGetAllUsersOfAGroup(value)),
  onSubmitTagPost: value => dispatch(PostActions.onSubmitTagPost(value)),
  onGetStrikesCountOfAUser: value => dispatch(StrikeActions.onGetStrikesCountOfAUser(value)),
  disableFirstTimePosting: () => dispatch(LoginActions.onDisableFirstTimePosting()),
  onBlockUser: value => dispatch(LoginActions.onBlockUser(value))
});

export default Moderator(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TagPost)
);
