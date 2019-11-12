import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Select } from 'antd';
import { FaCheck } from 'react-icons/fa';
import GroupActions from '../../Redux/GroupRedux.js';
import { UserDropdownListWrapper, UserOption, User } from './style';
import { Loader, FormInput, Avatar } from '../StyledComponents';
import { Colors } from '../../Theme';

const { Option } = Select;
const { primary } = Colors.colors;
const { onGetAllUsersOfAGroup } = GroupActions;
class TagPost extends Component {
  state = {
    groupMembers: [],
    showMembersList: true,
    taggedUsers: []
  };

  componentDidMount() {
    const { onGetAllUsersOfAGroup, user } = this.props;
    const { groupId } = user;
    // const { tagPostDiv } = this;

    // tagPostDiv.focus();
    // tagPostDiv.keyDown();
    onGetAllUsersOfAGroup(groupId);
  }

  componentDidUpdate(prevProps) {
    const { groupsMemberList } = this.props;
    if (prevProps.groupsMemberList !== groupsMemberList) {
      this.setState({ groupMembers: groupsMemberList });
    }
  }

  handleTagPostFocus = () => {
    this.setState({ showMembersList: true });
  };

  handleTagPostBlur = () => {
    // this.setState({ showMembersList: false });
  };

  getMembers = () => {
    const { groupMembers, showMembersList, taggedUsers } = this.state;
    return (
      groupMembers.length > 0
      && groupMembers.map(member => {
        console.log('group member', member);
        const check = taggedUsers.find(user => {
          const username = member.userName || member.studentUsername;
          return (
            user.username === username
            && user.isStudent === (member.userName ? 0 : 1)
          );
        });

        return (
          <Option key={member.userName || member.studentUsername}>
            <UserOption>
              <User>
                <Avatar avatar={member.avatar} height={15} />
                <span>{member.userName || member.studentUsername}</span>
              </User>
              <span>{check && <FaCheck />}</span>
            </UserOption>
          </Option>
        );
      })
    );
  };

  handleChange = user => {
    const { groupsMemberList, handleTagPost } = this.props;
    const { taggedUsers } = this.state;
    const newArr = [];
    const newMember = groupsMemberList.find(
      member => member.userName === user || member.studentUsername === user
    );
    const data = {
      id: newMember.userId || newMember.studentId,
      username: newMember.userName || newMember.studentUsername,
      isStudent: newMember.userName ? 0 : 1,
      avatar: newMember.avatar
    };
    const checkIfUserAlreadyTagged = taggedUsers.find(
      taggedUser => taggedUser.id === data.id
        && taggedUser.username === data.username
        && taggedUser.isStudent === data.isStudent
    );

    if (!checkIfUserAlreadyTagged) {
      this.setState({ taggedUsers: [data, ...taggedUsers] }, () => {
        handleTagPost(this.state.taggedUsers);
      });
    } else {
      const removeUser = taggedUsers.filter(
        taggedUser => taggedUser.id !== data.id
          || taggedUser.username !== data.username
          || taggedUser.isStudent !== data.isStudent
      );
      this.setState({ taggedUsers: removeUser }, () => {
        handleTagPost(this.state.taggedUsers);
      });
    }
  };

  onFocus = () => {
    this.setState({ showMembersList: true });
  };

  onBlur = () => {
    this.setState({ showMembersList: false });
  };

  onInputKeyDown = e => {
    console.log('onInputKeyDown', e.target.value, e.keyCode, e.keyCode === 8);
  };

  render() {
    const { groupMembers, showMembersList, taggedUsers } = this.state;
    const { taggedUsersArray } = this.props;
    return (
      <UserDropdownListWrapper>
        {/*  <select placeholder="Search">{this.getMemberList()}</select> */}
        <Select
          showSearch
          autoFocus
          style={{ width: '180px', border: '0px', outline: '0px' }}
          value=""
          placeholder="Search"
          onChange={this.handleChange}
          open={showMembersList}
          loading={!groupMembers || groupMembers.length === 0}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          notFoundContent="No Users Found"
          ref={r => {
            this.tagPost = r;
          }}
          onSelect={() => {
            this.tagPost.focus();
          }}
        >
          {this.getMembers()}
        </Select>
      </UserDropdownListWrapper>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user.user,
  groupsMemberList: state.group.groupsMemberList
});
const mapDispatchToProps = dispatch => ({
  onGetAllUsersOfAGroup: value => dispatch(onGetAllUsersOfAGroup(value))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TagPost);
