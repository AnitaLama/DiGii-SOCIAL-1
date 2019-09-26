import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FacebookEmoji from 'react-facebook-emoji';
import { Images } from '../../../Theme';
import Author from '../Author';
import Comment from '../Comment';
import CommentBox from '../CommentBox';
import PostActions from '../../../Redux/PostRedux';
import { ShowFeed } from '../../Functions';

import PostActivityAction from '../../../Redux/PostActivityRedux';

import {
  ReactionContainer,
  ReactionNumberStyle,
  DisplayReactionWrapper,
  DisplayReaction,
  ReactorsList,
  PostWrapper,
  ActualPostWrapper,
  CommentContainer,
  ReactionsContainer,
  ReactionType,
  ActualPost
} from './style';

const Reactions = ({ handleReactionSelection, reactionpopup }) => (
  <ReactionsContainer>
    <ReactionType className="like" name="like" onClick={() => reactionpopup()}>
      <img src={Images.digii5.LikeIcon} alt="DiGii-like-icon" />
      Like
    </ReactionType>
    <ReactionType
      className="comment"
      name="comment"
      onClick={() => {
        handleReactionSelection('comment');
      }}
    >
      <img src={Images.digii5.CommentIcon} alt="DiGii-comment-icon" />
      Comment
    </ReactionType>
    <ReactionType
      className="share"
      name="share"
      onClick={() => {
        handleReactionSelection('share');
      }}
    >
      <img src={Images.digii5.DiGiiShareIcon} alt="DiGii-share-icon" />
      Share
    </ReactionType>
  </ReactionsContainer>
);

class SinglePost extends Component {
  constructor() {
    super();
    this.state = {
      showCommentBox: false,
      showreactions: false,
      totalReactionCounts: null,
      toggleHover: false,
      getOnlyReactionOnHover: []
    };
  }

  componentWillMount() {
    // console.log('mount', this.state);
    // this.props.onHandleLikeReaction();

    // Display total count of reactions

    const { data, onHandleLikeReaction } = this.props;
    onHandleLikeReaction();
    const { post_activities } = data;
    const reactioncount = [];
    post_activities
      && post_activities.map(item => reactioncount.push(item.postActivityActivityTypeId));
    this.setState({ totalReactionCounts: reactioncount.length });
  }

  componentWillReceiveProps(nextProps, nextState) {
    const { data } = nextProps;
    const { post_activities } = data;
    const reactioncount = [];

    post_activities.map(
      item => item.postActivityActivityTypeId !== 0
        && reactioncount.push(item.postActivityActivityTypeId)
    );
    this.setState({ totalReactionCounts: reactioncount.length });
  }

  selectPollAnswer = (option, selected) => {
    const { pollOptionPollId, pollOptionId } = option;
    const { user, onRespondToPoll } = this.props;
    const { isStudent, id } = user.user;
    const data = {
      pollResponsePollId: pollOptionPollId,
      pollResponsePollOptionId: pollOptionId,
      pollResponseIsStudent: isStudent ? 1 : 0,
      pollResponseCommentatorId: id,
      pollResponseId: selected ? selected.pollResponseId : null
    };
    onRespondToPoll(data);
  };

  getContent = data => {
    const { user } = this.props;
    // const type = post_type && post_type.postTypeTitle;
    return (
      <ShowFeed
        post={data}
        user={user.user}
        selectPollAnswer={this.selectPollAnswer}
      />
    );
  };

  handleReactionSelection = action => {
    if (action === 'comment') {
      this.setState({ showCommentBox: !this.state.showCommentBox });
    }
  };

  toggleHover = activityTypeId => {
    this.setState({ currentHoverId: activityTypeId });

    this.setState({ toggleHover: true });

    this.getCurrentLikesReactions(activityTypeId);
  };

  getCurrentLikesReactions = param => {
    const getOnlyReactionOnHover1 = [];
    const { data, likeReactions } = this.props;
    const { post_activities } = data;

    post_activities.map(item => {
      if (
        item
        && item.activity_type
        && item.activity_type.activityTypeId === param
      ) {
        getOnlyReactionOnHover1.push(item);
      }
    });
    this.setState({ getOnlyReactionOnHover: getOnlyReactionOnHover1 });
  };

  handleReactionClicked = value => {
    const {
      onSelectReaction, data, user, likeReactions
    } = this.props;
    const { postId, postIsStudent } = data;

    const { id } = user.user;
    const selectedReaction = likeReactions.find(
      item => item.activityTypeName === value
    );
    const values = {
      postActivityActivityTypeId: selectedReaction.activityTypeId,
      postActivityActorId: id,
      postActivityIsStudent: postIsStudent,
      postActivityPostId: postId
    };

    onSelectReaction(values);
    this.multipleLikes();
  };

  multipleLikes = () => {
    this.setState({ showreactions: !this.state.showreactions });
  };

  toggleHoverleave = () => {
    this.setState({ toggleHover: false });
  };

  showCurrentReactions = () => {
    const { data, likeReactions } = this.props;
    const { post_activities } = data;
    const reactionId = [];
    post_activities
      && post_activities.map(item => reactionId.push(item.postActivityActivityTypeId));

    // Taking only unique emo to display

    const uniquereactions = [...new Set(reactionId)];

    return uniquereactions.map(item => {
      const reaction = likeReactions.find(
        reactionItem => reactionItem.activityTypeId === item
      );

      if (reaction) {
        const { activityTypeId } = reaction;
        return (
          <ReactorsList
            onMouseEnter={() => {
              this.toggleHover(activityTypeId);
            }}
            onMouseLeave={this.toggleHoverleave}
            key={reaction.activityTypeId}
          >
            <FacebookEmoji type={reaction.activityTypeName} size="xxs" />
            {' '}
            {this.state.toggleHover && (
              <div className="listOfReactors">
                {this.state.getOnlyReactionOnHover.map(
                  value => value.postActivityActivityTypeId
                      === reaction.activityTypeId
                    && (value.postActivityIsStudent ? (
                      <li>{value.student.studentUsername}</li>
                    ) : (
                      <li>{value.user.userName}</li>
                    ))
                )}
              </div>
            )}
          </ReactorsList>
        );
      }
      return true;
    });
  };

  hideCommentBox = () => {
    // this.setState({ showCommentBox: false });
  };

  render() {
    const { data, modalpopup } = this.props;
    const { showCommentBox } = this.state;
    let { post_comments } = data;
    post_comments = post_comments
      && post_comments.sort((a, b) => a.postCommentId - b.postCommentId);
    return (
      <PostWrapper style={{ position: 'relative' }}>
        <ActualPostWrapper>
          <div>
            <Author data={data} modalpopup={modalpopup} />
            <ActualPost>{this.getContent(data)}</ActualPost>
          </div>
          <DisplayReactionWrapper>
            <DisplayReaction>
              <div>{this.showCurrentReactions()}</div>

              <ReactionNumberStyle>
                {this.state.totalReactionCounts !== 0
                  && this.state.totalReactionCounts}
                {' '}
              </ReactionNumberStyle>
            </DisplayReaction>

            <Reactions
              handleReactionSelection={this.handleReactionSelection}
              reactionpopup={this.multipleLikes}
            />

            {this.state.showreactions && (
              <ReactionContainer>
                <div
                  onClick={() => {
                    this.handleReactionClicked('like');
                  }}
                >
                  <FacebookEmoji type="like" size="xs" />
                </div>
                <div
                  onClick={() => {
                    this.handleReactionClicked('love');
                  }}
                >
                  <FacebookEmoji type="love" size="xs" />
                </div>
                <div
                  onClick={() => {
                    this.handleReactionClicked('wow');
                  }}
                >
                  <FacebookEmoji type="wow" size="xs" />
                </div>
                {' '}
                <div
                  onClick={() => {
                    this.handleReactionClicked('yay');
                  }}
                >
                  <FacebookEmoji type="yay" size="xs" />
                </div>
                {' '}
                <div
                  onClick={() => {
                    this.handleReactionClicked('angry');
                  }}
                >
                  <FacebookEmoji type="angry" size="xs" />
                </div>
                <div
                  onClick={() => {
                    this.handleReactionClicked('haha');
                  }}
                >
                  <FacebookEmoji type="haha" size="xs" />
                </div>
                <div
                  onClick={() => {
                    this.handleReactionClicked('sad');
                  }}
                >
                  <FacebookEmoji type="sad" size="xs" />
                </div>
              </ReactionContainer>
            )}
          </DisplayReactionWrapper>
        </ActualPostWrapper>

        <CommentContainer>
          <div
            className="commentSection"
            style={{
              maxHeight: showCommentBox ? '226px' : '250px'
            }}
          >
            {post_comments
              && post_comments.map((comment, i) =>
                // console.log(
                //   'comment>>>>>',
                //   comment.postCommentIsDeleted,
                //   comment.postCommentIsBad
                // );
                (!comment.postCommentIsBad && !comment.postCommentIsDeleted ? (
                  <Comment key={comment + i} data={comment} />
                ) : null))}
          </div>
          <div className="commentBox">
            {showCommentBox && <CommentBox data={data} />}
          </div>
        </CommentContainer>
      </PostWrapper>
    );
  }
}
SinglePost.propTypes = { data: PropTypes.object };

const mapStateToProps = state => ({
  user: state.user,
  likeReactions: state.postActivity.postActivityReactionTypes
});

const mapDispatchToProps = dispatch => ({
  onRespondToPoll: value => dispatch(PostActions.onRespondToPoll(value)),
  onHandleLikeReaction: value => dispatch(PostActivityAction.onGetPostActivitiesReactionTypes(value)),
  onSelectReaction: value => dispatch(PostActivityAction.onSelectReaction(value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SinglePost);
