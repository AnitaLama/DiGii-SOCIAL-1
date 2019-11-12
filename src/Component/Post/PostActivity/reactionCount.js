import React, { Component } from 'react';
import {
  ReactionCountWrapper,
  ReactionUserListWrapper,
  ReactionCountContainer,
  ReactionUserListContainer
} from './style';
import { ReactionsList } from '../../Functions';

class ReactionCount extends Component {
  state = {
    showList: true
  };

  showList = () => {
    const { showList } = this.state;
    this.setState({ showList: !showList });
  };

  hideList = () => {
    this.setState({ showList: false });
  };

  getUsersList = () => {
    const { data } = this.props;

    const { post_activities } = data;
    return post_activities.map((activity, i) => {
      const {
        postActivityIsStudent,
        user,
        student,
        postActivityActivityTypeId
      } = activity;
      const selectedReaction = ReactionsList.find(
        reaction => reaction.id === postActivityActivityTypeId
      );
      const reaction = selectedReaction && selectedReaction.value;

      const reactionUser = postActivityIsStudent
        ? student.studentFirstname
        : user.userName;
      return (
        <li key={`reactionUser${i}`}>
          {reaction}
          {reactionUser}
        </li>
      );
    });
  };

  getLatestUsers = postActivities => {
    const distinctReactions = [
      ...new Set(postActivities.map(x => x.postActivityActivityTypeId))
    ];

    return distinctReactions.slice(0, 3).map(activity => {
      const showReaction = ReactionsList.find(item => item.id === activity);
      return showReaction.value;
    });
  };

  render() {
    const { data } = this.props;
    const { post_activities } = data;
    const { showList } = this.state;
    let latestActivities = post_activities;
    latestActivities =      latestActivities && latestActivities.length > 1
        ? latestActivities.sort((a, b) => b.postActivityId - a.postActivityId)
        : latestActivities;
    latestActivities =      latestActivities
      && latestActivities.filter(item => item.postActivityActivityTypeId !== 0);
    const count = latestActivities && latestActivities.length;

    return (
      <ReactionCountWrapper>
        {count > 0 && (
          <ReactionCountContainer
            tabIndex="-3"
            onClick={this.showList}
            onBlur={this.hideList}
          >
            {this.getLatestUsers(latestActivities)}
            {count}
            {showList && (
              <ReactionUserListWrapper>
                <ReactionUserListContainer>
                  {this.getUsersList()}
                </ReactionUserListContainer>
              </ReactionUserListWrapper>
            )}
          </ReactionCountContainer>
        )}
      </ReactionCountWrapper>
    );
  }
}

export default ReactionCount;
