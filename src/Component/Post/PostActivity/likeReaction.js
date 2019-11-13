import React, { Component } from 'react';
import {
  PostActivityContainer,
  PostActivityIcon,
  PostReactionsWrapper,
  ReactionContainer,
  ReactionComponent
} from './style';
import { Images } from '../../../Theme';
import { ReactionsList } from '../../Functions';

const { LikeIcon } = Images.digii5;

class LikeReaction extends Component {
  state = {
    showReactions: false
  };

  showReactions = () => {
    const { showReactions } = this.state;
    this.setState({ showReactions: !showReactions });
  };

  showReactionsList = () => {
    this.setState({ showReactions: true });
  };

  onReactionClick = reaction => {
    const { handleReactionClick } = this.props;
    handleReactionClick(reaction);
    this.hideReactions();
  };

  hideReactions = () => {
    setTimeout(() => {
      this.setState({ showReactions: false });
    }, 800);
  };

  getReactions = () => ReactionsList.map(reaction => (
      <ReactionComponent
        key={reaction.name}
        onClick={() => {
          this.onReactionClick(reaction);
        }}
      >
        {reaction.value}
      </ReactionComponent>
    ));

  render() {
    const { showReactionList } = this.props;
    const { showReactions } = this.state;

    return (
      <PostActivityContainer
        className="likeButton"
        tabIndex="-4"
        onClick={this.showReactionsList}
        onBlur={this.hideReactions}
      >
        {showReactions && showReactionList && (
          <PostReactionsWrapper
            onMouseEnter={this.showReactionsList}
            onBlur={this.hideReactions}
            tabIndex="-2"
          >
            <ReactionContainer>{this.getReactions()}</ReactionContainer>
          </PostReactionsWrapper>
        )}
        <span
          tabIndex="-2"
          onClick={this.showReactions}
          onBlur={() => {
            if (!showReactions) this.hideReactions();
          }}
        >
          <PostActivityIcon src={LikeIcon} alt="DiGii-like-icon" />
          <span> Like</span>
        </span>
      </PostActivityContainer>
    );
  }
}

export default LikeReaction;
