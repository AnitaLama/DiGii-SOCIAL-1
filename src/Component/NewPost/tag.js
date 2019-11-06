import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Select } from 'antd';
import GroupActions from '../../Redux/GroupRedux.js';
import {
  TagPostWrapper,
  UserDropdownList,
  UserDropdownListWrapper,
  UserDropdownListContainer,
  UserDropdownListItem,
  TaggedMembersChipWrapper,
  TaggedMembersChip,
  TagPostContainer
} from './style';
import { Loader, FormInput } from '../StyledComponents';
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
      && groupMembers.map(member => (
        <Option key={member.userName || member.studentUsername}>
          {member.userName || member.studentUsername}
        </Option>
      ))
    );
  };

  handleChange = taggedUsersList => {
    const { groupsMemberList, handleTagPost } = this.props;

    let newArr = [];
    taggedUsersList.map(user => {
      const newMember = groupsMemberList.find(
        member => member.userName === user || member.studentUsername === user
      );
      const data = {
        id: newMember.userId || newMember.studentId,
        username: newMember.userName || newMember.studentUsername,
        isStudent: newMember.userName ? 0 : 1
      };
      newArr = [data, ...newArr];
    });
    handleTagPost(newArr, taggedUsersList);
  };

  onFocus = () => {
    this.setState({ showMembersList: true });
  };

  onBlur = () => {
    this.setState({ showMembersList: false });
  };

  render() {
    const { groupMembers, showMembersList, taggedUsers } = this.state;
    const { taggedUsersArray } = this.props;
    return (
      <UserDropdownListWrapper>
        <Select
          mode="multiple"
          style={{ width: '300px' }}
          placeholder="Please select"
          onChange={this.handleChange}
          value={taggedUsersArray}
          open={showMembersList}
          loading={!groupMembers || groupMembers.length === 0}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
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
