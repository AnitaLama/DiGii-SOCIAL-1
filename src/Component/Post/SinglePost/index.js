import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FacebookEmoji from 'react-facebook-emoji';
import { FaCircle } from 'react-icons/fa';
import { Images } from '../../../Theme';
import Author from '../Author';
import Comment from '../Comment';
import CommentBox from '../CommentBox';
import PostActions from '../../../Redux/PostRedux';
import { PostActivity, ReactionCount } from '../PostActivity';
import PostActivityAction from '../../../Redux/PostActivityRedux';
import { Avatar } from '../../StyledComponents';

import {
  ReactorsList,
  PostWrapper,
  ActualPostWrapper,
  CommentContainer,
  ReactionsContainer,
  ReactionType,
  ActualPost,
  ImageWrapper,
  ImageContainer,
  BannerContainer,
  BannerText,
  PostContent,
  PollWrapper,
  PostText
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
    const { data } = this.props;
    // onHandleLikeReaction();
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
    const { data, user, onRespondToPoll } = this.props;
    const { postId } = data;
    const { pollOptionPollId, pollOptionId } = option;
    // const { user, onRespondToPoll } = this.props;
    // const { postId } = post;
    const { isStudent, id } = user.user;
    const pollResponse = {
      pollResponsePollId: pollOptionPollId,
      pollResponsePollOptionId: pollOptionId,
      pollResponseIsStudent: isStudent ? 1 : 0,
      pollResponseCommentatorId: id,
      pollResponseId: selected ? selected.pollResponseId : null,
      postId
    };
    onRespondToPoll(pollResponse);
  };

  // NEW CODE
  getContent = () => {
    const { user, data } = this.props;
    // const type = post_type && post_type.postTypeTitle;
    const { isStudent, id } = user.user;
    const {
      postText,
      postBanner,
      postBannerText,
      postGif,
      postImage,
      poll
    } = data;
    return (
      <PostContent>
        {postText && <PostText>{postText}</PostText>}
        {postBanner && (
          <ImageWrapper>
            <BannerContainer background={postBanner}>
              <BannerText>{postBannerText}</BannerText>
            </BannerContainer>
          </ImageWrapper>
        )}
        {postGif && (
          <ImageWrapper>
            <ImageContainer src={postGif} />
          </ImageWrapper>
        )}
        {postImage && (
          <ImageWrapper>
            <ImageContainer src={postImage} />
          </ImageWrapper>
        )}
        {poll && (
          <div>
            <PostText className="captions">{poll.pollOptionQuestion}</PostText>
            {poll.poll_options
              && poll.poll_options.map((option, i) => {
                const { poll_responses } = option;
                const hasUserVoted = poll_responses.find(
                  item => item.pollResponseIsStudent == isStudent
                    && item.pollResponseCommentatorId === id
                );
                const selectedAnswer =                  hasUserVoted
                  && hasUserVoted.pollResponsePollOptionId === option.pollOptionId;
                return (
                  <PollWrapper
                    onClick={() => {
                      this.selectPollAnswer(option, hasUserVoted);
                    }}
                    key={`${option}${i}`}
                  >
                    <div>
                      <FaCircle
                        style={{ color: selectedAnswer ? '#707070' : 'white' }}
                      />
                      {option.pollOptionImagePath && (
                        <img
                          src={`${option.pollOptionImagePath}`}
                          alt={`${poll.pollOptionQuestion}-option${i}`}
                        />
                      )}
                      {option.pollOptionText}
                    </div>
                    <span>
                      {poll_responses.slice(0, 3).map(item => {
                        const avatar = item.pollResponseIsStudent
                          ? item.student.avatar
                          : item.user.avatar;
                        return (
                          <Avatar
                            key={`poll_responses-${item}`}
                            avatar={avatar}
                            height={17.75}
                          />
                        );
                      })}
                      {poll_responses.length > 3 && poll_responses.length - 3}
                    </span>
                  </PollWrapper>
                );
              })}
          </div>
        )}
      </PostContent>
    );
  };

  handleReactionClick = reaction => {
    const { data, user, onSelectReaction } = this.props;
    console.log('reaction clicked', data, user);
    const { isStudent, id } = user.user;
    const { postId } = data;
    const values = {
      postActivityActivityTypeId: reaction.id,
      postActivityActorId: id,
      postActivityIsStudent: isStudent,
      postActivityPostId: postId
    };

    onSelectReaction(values);
  };

  showReactionCount = () => {
    const { data } = this.props;
    const { post_activities } = data;
    return <div>{post_activities.length}</div>;
  };

  //  END OF NEW CODE HERe
  handleReactionSelection = action => {
    const { data, selectAPost } = this.props;
    if (action === 'comment') {
      selectAPost(data);
      this.setState({
        showCommentBox: !this.state.showCommentBox,
        showreactions: false
      });
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
    const { data, selectAPost } = this.props;
    selectAPost(data);
    this.setState({
      showreactions: !this.state.showreactions,
      showCommentBox: false
    });
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
{" "}
            {this.state.toggleHover && (
              <div className="listOfReactors">
                {this.state.getOnlyReactionOnHover.map(
                  value => value.postActivityActivityTypeId
                      === reaction.activityTypeId
                    && (value.postActivityIsStudent ? (
                      <li key={value.postActivityId}>
                        {value.student.studentUsername}
                      </li>
                    ) : (
                      <li key={value.postActivityId}>{value.user.userName}</li>
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
    this.setState({ showCommentBox: false });
  };

  showCommentBox = () => {
    const { showCommentBox } = this.state;
    const { selectAPost, data } = this.props;
    selectAPost(data);
    this.setState({ showCommentBox: true });
  };

  render() {
    const { data, selectedPost, modalpopup } = this.props;
    const { showCommentBox, showreactions } = this.state;
    let { post_comments, postId } = data;
    const check = selectedPost === postId;
    post_comments =      post_comments
      && post_comments.sort((a, b) => a.postCommentId - b.postCommentId);
    return (
      <PostWrapper style={{ position: 'relative' }}>
        <ActualPostWrapper>
          <div>
            <Author data={data} modalpopup={modalpopup} />
            <ActualPost>{this.getContent()}</ActualPost>
          </div>

          <ReactionCount {...this.props} />
          <PostActivity
            showCommentBox={this.showCommentBox}
            handleReactionClick={this.handleReactionClick}
          />
        </ActualPostWrapper>

        <CommentContainer>
          <div
            className="commentSection"
            style={{
              maxHeight: showCommentBox ? '226px' : '250px'
            }}
          >
            {post_comments
              && post_comments.map((comment, i) => (!comment.postCommentIsBad && !comment.postCommentIsDeleted ? (
                  <Comment key={comment + i} data={comment} />
                ) : null))}
          </div>
          <div className="commentBox">
            {showCommentBox && check && (
              <CommentBox data={data} hideCommentBox={this.hideCommentBox} />
            )}
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
  // onHandleLikeReaction: value => dispatch(PostActivityAction.onGetPostActivitiesReactionTypes(value)),
  onSelectReaction: value => dispatch(PostActivityAction.onSelectReaction(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(SinglePost);
