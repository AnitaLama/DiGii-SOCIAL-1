import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import ContentEditable from 'react-contenteditable';
import { Tag } from 'antd';
import { PostWrapper } from './index';
import { FormTextArea, Button } from '../StyledComponents';
import GroupActions from '../../Redux/GroupRedux';
import { Colors, boxShadow } from '../../Theme';

const {
  primary, blue, grey, snow, secondary
} = Colors.colors;

const PostWrapperContainer = styled.div`
  // position: relative;
`;
const UserListWrapper = styled.div`
  position: relative;
  margin-left: -53px;
  span {
    &::after {
      content: ',';
    }
  }
  span:last-of-type {
    &::after {
      content: ',';
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
function extractUsers(text) {
  return text.match(/(\s*@[a-zA-Z0-9_-]+\s*)/gi);
}

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
      users: []
    };
  }

  componentDidMount() {
    const { user, onGetAllUsersOfAGroup, group } = this.props;
    const { groupId } = user;
    const { users } = group;

    onGetAllUsersOfAGroup(groupId);
    this.setState({ users });
  }

  handleKeyDown = event => {
    const start = event.target.selectionStart;
    const end = event.target.selectionEnd;
    // console.log(start, end);
  };

  tagFriends = e => {
    const { group } = this.props;
    const { users } = group;
    const { value } = e.target;
    // const { textarea } = this;
    // console.log(textarea.caretPosition);
    console.log(e.target.selectionStart, e.target.selectionEnd);
    if (value[value.length - 1] === '@') {
      this.setState({ showUsers: true, left: e.target.selectionEnd });
    }
    const checkUsername = extractUsers(value);
    // const newArr = checkUsername && checkUsername.map(item => value.replace(item, ' '));
    // console.log('>>>>', value, checkUsername);
    let tempValue = value;

    checkUsername
      && checkUsername.map(item => {
        item = item.replace(' ', '');
        tempValue = tempValue.replace(
          item,
          `<span  style="color:red">${item}</span>`
        );
      });
    this.setState({ text: tempValue });
  };

  onFocus = () => {
    const { text } = this.state;
    if (text === 'Tag your friends') {
      this.setState({ text: '', showUsers: true });
    }
  };

  finishedTagging = () => {
    this.setState({ hasTaggedFriends: true });
  };

  handleSave = editor => {
    console.log(`Saved with python-markdown value: ${editor.value}`);
  };

  selectUser = user => {
    console.log(user);
    const { taggedUsers, users } = this.state;
    const newArr = [];
    users.map(item => {
      if (
        item.u_name !== user.u_name
        || item.st_username !== user.st_username
      ) {
        newArr.push(item);
      }
    });

    this.setState(prevState => ({
      taggedUsers: [...prevState.taggedUsers, user.u_name || user.st_username],
      users: newArr,
      showUsers: false
    }));
  };

  render() {
    const { showUsers, taggedUsers, users } = this.state;

    const { text, hasTaggedFriends } = this.state;
    // if (hasTaggedFriends) {
    //   return (
    //     <PostWrapper>
    //       {text}
    //       <FormTextArea placeholder="Write something..." />
    //       <div>
    //         <Button className="rounded small" onClick={this.finishedTagging}>
    //           OK
    //         </Button>
    //       </div>
    //     </PostWrapper>
    //   );
    // }

    return (
      <PostWrapperContainer>
        <PostWrapper>
          {/* <Editor isExpandedByDefault onSave={this.handleSave} /> */}
          <FormTextArea
            placeholder="Tag your friends"
            onChange={this.tagFriends}
            onKeyDown={this.handleKeyDown}
            onFocus={this.onFocus}
            html={text}
            ref={r => (this.textarea = r)}
          />
          <div>
            <Button className="rounded small" onClick={this.finishedTagging}>
              OK
            </Button>
          </div>
        </PostWrapper>
        <UserListWrapper>
          <div>
            with
            {taggedUsers.map(user => (
              <span style={{ color: blue }}>
                {' '}
                {user}
              </span>
            ))}
          </div>
          <ContentEditable
            onFocus={() => {
              this.setState({ showUsers: true });
            }}
            // onChange={}
            html="tag your friends"
          />
          {showUsers && (
            <UserList>
              {users.map(item => (
                <li
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
  group: state.group
});
const mapDispatchToProps = dispatch => ({
  onGetAllUsersOfAGroup: value => dispatch(GroupActions.onGetAllUsersOfAGroup(value))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TagPost);
