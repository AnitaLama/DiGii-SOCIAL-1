import React, { Component } from 'react';
import styled from '@emotion/styled';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FacebookEmoji from 'react-facebook-emoji';
import {
  Colors,
  fontSize,
  grid,
  boxShadow,
  Images,
  fontFilson,
  flexCentering
} from '../../Theme';
import Author from './Author';
import Comment from './Comment';
import CommentBox from './CommentBox';
import PostActions from '../../Redux/PostRedux';
import { ShowFeed } from '../Functions';

import PostActivityAction from '../../Redux/PostActivityRedux';

const { snow, pencil, secondary } = Colors.colors;

const ReactionContainer = styled.div`
  display: flex;
`;

const ReactionNumberStyle = styled.div`
  font-size: 13px;
  font-family: sans-serif;
  font-weight: bold;
`;

const DisplayReaction = styled.div`
  display: flex;
  div:first-of-type {
    display: flex;
  }
`;

const PostWrapper = styled.div`
  background: ${snow};
  margin: 28px 0;
  padding: 24px;
  border-radius: 40px;
  ${boxShadow()};
  ${grid(2, '1fr')};
`;
const ActualPostWrapper = styled.div`
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  padding-left: 20px;
  .commentBox {
    width: 95%;
  }
  .commentSection {
    width: 100%;
    padding-right: 10px;
    overflow-y: auto;
    overflow-x: hidden;

    &::-webkit-scrollbar {
      width: 0.25em;
    }
    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px ${pencil};
    }
    &::-webkit-scrollbar-thumb {
      background-color: ${secondary};
      outline: 1px solid ${secondary};
    }
  }
`;
const ReactionsContainer = styled.div`
  display: flex;

  img {
    height: 11.01px;
    padding-right: 6px;
  }
  span {
    padding: 0 10px;
    ${fontFilson};
    ${fontSize(12)};
    ${flexCentering()};
    color: ${Colors.colors.dark};
    cursor: pointer;
    &:hover {
      color: black;
      img {
        height: 11.73px;
      }
    }
  }
`;
const ReactionType = styled.span``;
const ActualPost = styled.div`
  padding: 10px 0;
  .captions {
    padding-bottom: 10px;
    word-break: break-word;
  }
  div {
    color: ${Colors.colors.light};
    ${fontSize(14)};
    line-height: 17px;
  }
`;

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
      totalReactionCountsArray: [],
      toggleHover: false
    };
  }

  componentWillMount() {
    this.props.onHandleLikeReaction();

    // Display total count of reactions

    const { data, likeReactions } = this.props;
    const { post_activities } = data;
    const reactioncount = [];
    post_activities
      && post_activities.map(item => reactioncount.push(item.pa_at_id));
    this.setState({ totalReactionCounts: reactioncount.length });
  }

  componentWillReceiveProps(nextProps, nextState) {
    const { data } = nextProps;
    const { post_activities } = data;
    const reactioncount = [];

    post_activities.map(
      item => item.pa_at_id !== 0 && reactioncount.push(item.pa_at_id)
    );
    this.setState({ totalReactionCounts: reactioncount.length });
  }

  selectPollAnswer = (option, selected) => {
    const { popt_po_id, popt_id } = option;
    const { user, onRespondToPoll } = this.props;
    const { isStudent, id } = user.user;
    const data = {
      pr_po_id: popt_po_id,
      pr_popt_id: popt_id,
      pr_is_student: isStudent ? 1 : 0,
      pr_commentator_id: id,
      pr_id: selected ? selected.pr_id : null
    };
    onRespondToPoll(data);
  };

  getContent = data => {
    const { user } = this.props;
    // const type = post_type && post_type.pt_title;
    return <ShowFeed post={data} user={user.user} />;
  };

  handleReactionSelection = action => {
    if (action === 'comment') {
      this.setState({ showCommentBox: !this.state.showCommentBox });
    }
  };

  toggleHover = () => {
    this.setState({ toggleHover: !this.state.toggleHover });
  };

  handleReactionClicked = value => {
    const { data, user } = this.props;
    const { p_id, p_isStudent } = data;

    const { id } = user.user;

    const selectedReaction = this.props.likeReactions.find(
      item => item.at_name === value
    );

    const values = {
      pa_at_id: selectedReaction.at_id,
      pa_actor_id: id,
      pa_is_student: p_isStudent,
      pa_p_id: p_id
    };

    this.props.onSelectReaction(values);
    this.multipleLikes();
  };

  multipleLikes = () => {
    this.setState({ showreactions: !this.state.showreactions });
  };

  showCurrentReactions = () => {
    const { data, likeReactions } = this.props;
    const { post_activities } = data;
    const reactionId = [];
    post_activities
      && post_activities.map(item => reactionId.push(item.pa_at_id));

    // Taking only unique emo to display

    const uniquereactions = [...new Set(reactionId)];

    return uniquereactions.map(item => {
      const reaction = likeReactions.find(
        reactionItem => reactionItem.at_id === item
      );

      if (reaction) {
        return (
          <DisplayReaction
            onMouseEnter={this.toggleHover}
            onMouseLeave={this.toggleHover}
          >
            <FacebookEmoji type={reaction.at_name} size="xxs" />
            {' '}
            {this.state.toggleHover
              && post_activities.map(
                value => value.pa_at_id === reaction.at_id
                  && (value.pa_is_student ? (
                    <li>{value.student.st_username}</li>
                  ) : (
                    <li>{value.user.u_name}</li>
                  ))
              )}
          </DisplayReaction>
        );
      }
      return true;
    });
  };

  render() {
    const { data, modalpopup } = this.props;
    const { showCommentBox } = this.state;
    let { post_comments } = data;
    post_comments = post_comments && post_comments.sort((a, b) => a.pc_id - b.pc_id);
    return (
      <PostWrapper style={{ position: 'relative' }}>
        <ActualPostWrapper>
          <div>
            <Author data={data} modalpopup={modalpopup} />
            <ActualPost>{this.getContent(data)}</ActualPost>
          </div>
          <DisplayReaction>
            <div>{this.showCurrentReactions()}</div>

            <ReactionNumberStyle>
              {this.state.totalReactionCounts !== 0
                ? this.state.totalReactionCounts
                : null}
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
        </ActualPostWrapper>

        <CommentContainer>
          <div
            className="commentSection"
            style={{
              maxHeight: showCommentBox ? '226px' : '250px'
            }}
          >
            {post_comments
              && post_comments.map((comment, i) => (!comment.pc_is_bad ? (
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
