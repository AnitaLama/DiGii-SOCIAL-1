import React, { Component } from 'react';
import styled from '@emotion/styled';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FaCircle } from 'react-icons/fa';
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

import PostActivityAction from '../../Redux/PostActivityRedux';

import FacebookEmoji from 'react-facebook-emoji';

const url = 'https://digii-posts.s3-ap-southeast-2.amazonaws.com';

const { snow } = Colors.colors;

const ReactionContainer = styled.div`
  display: flex;
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
`;

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  padding-left: 20px;
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
    &:hover {{multipleLikes}
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
  }
  div {
    color: ${Colors.colors.light};
    ${fontSize(14)};
    line-height: 17px;
  }
`;
const PollWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  svg {
    color: white;
    border: 2px solid black;
    border-radius: 10px;
    margin-right: 10px;
    cursor: pointer;
  }
  img {
    height: 22px;
    width: 22px;
    border-radius: 22px;
    margin-right: 10px;
  }
`;

const Reactions = ({ handleReactionSelection, reactionpopup }) => {
  return (
    <ReactionsContainer>
      <ReactionType
        className="like"
        name="like"
        onClick={() => reactionpopup()}
      >
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
};

const Gif = styled.img`
  width: 100%;
`;
const Banner = styled.img`
  width: 100%;
  @media (max-width: 960px) {
    width: 100%;
  }
`;
const Video = styled.video`
  width: 100%;
`;
const BannerWrapper = styled.div`
  // background: ${props => `url(${props.image})`};
  width: 100%;
  position:relative;
  div{
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;padding: 20px;
    text-align:center;
    ${flexCentering()};
    color: ${snow};
    ${fontSize(20)}
  }
`;

class SinglePost extends Component {
  constructor() {
    super();
    this.state = {
      showCommentBox: false,
      showreactions: false,
      totalReactionCounts: null,
      totalReactionCountsArray: []
    };
  }

  selectPollAnswer = option => {
    const { popt_po_id, popt_id } = option;
    const { user, onRespondToPoll } = this.props;
    const { isStudent, id } = user.user;
    const data = {
      pr_po_id: popt_po_id,
      pr_popt_id: popt_id,
      pr_is_student: isStudent ? 1 : 0,
      pr_commentator_id: id
    };
    onRespondToPoll(data);
  };

  getContent = data => {
    const { p_body, post_type, p_text } = data;
    const { user } = this.props;
    const type = post_type && post_type.pt_title;
    switch (type) {
      case 'text':
        return <div>{p_text}</div>;
      case 'gif':
        return (
          <div>
            <div className="captions">{p_text}</div>
            <Gif src={`${p_body}`} />
          </div>
        );
      case 'photo/video':
        const { p_is_image } = data;
        if (p_is_image) {
          return (
            <div>
              <div className="captions">{p_text}</div>
              <Gif src={`${p_body}`} />
            </div>
          );
        }
        return (
          <div>
            <div className="captions">{p_text}</div>
            <Video src={`${p_body}`} controls />
          </div>
        );
      case 'poll':
        const { poll } = data;
        const { po_question, poll_options } = poll;
        let { isStudent, id } = user.user;
        isStudent = isStudent ? 1 : 0;
        return (
          <div>
            <div className="captions">{po_question}</div>
            {poll_options.map((option, i) => {
              const { poll_responses } = option;
              const hasUserVoted = poll_responses.find(
                item =>
                  item.pr_is_student === isStudent &&
                  item.pr_commentator_id === id
              );
              const selectedAnswer =
                hasUserVoted && hasUserVoted.pr_popt_id === option.popt_id;

              return (
                <PollWrapper
                  onClick={() => {
                    if (!hasUserVoted) {
                      this.selectPollAnswer(option);
                    }
                  }}
                  data
                  key={`${option}${i}`}
                >
                  <div>
                    <FaCircle
                      style={{ color: selectedAnswer ? 'grey' : 'white' }}
                    />
                    {option.popt_image_path && (
                      <img
                        src={`${url}/${option.popt_image_path}`}
                        alt={`${po_question}-option${i}`}
                      />
                    )}
                    {option.popt_text}
                  </div>
                  <span>{poll_responses.length} voted</span>
                </PollWrapper>
              );
            })}
          </div>
        );
      case 'banner':
        return (
          <BannerWrapper>
            <Banner src={p_body} />
            <div>
              {' '}
              <span
                style={{
                  fontSize:
                    p_text.length < 30
                      ? '45px'
                      : p_text.length < 80
                      ? '30px'
                      : '25px',
                  lineHeight:
                    p_text.length < 30
                      ? '40px'
                      : p_text.length < 80
                      ? '30px'
                      : '25px'
                }}
              >
                {' '}
                {p_text}
              </span>
            </div>
          </BannerWrapper>
        );
      case 'tag':
        const { notifications } = data;
        return <div>{p_text}</div>;
      default:
        return <div>{p_body}</div>;
    }
  };

  handleReactionSelection = action => {
    if (action === 'comment') {
      this.setState({ showCommentBox: !this.state.showCommentBox });
    }
  };

  handleReactionClicked = value => {
    const { onSelectReaction, data, user } = this.props;
    const { p_id, p_isStudent } = data;

    const { id } = user.user;

    let selectedReaction = this.props.likeReactions.find(item => {
      return item.at_name === value;
    });

    const values = {
      pa_at_id: selectedReaction.at_id,
      pa_actor_id: id,
      pa_is_student: p_isStudent,
      pa_p_id: p_id
    };

    this.props.onSelectReaction(values);
    this.multipleLikes();
  };

  componentWillMount() {
    this.props.onHandleLikeReaction();

    //Display total count of reactions

    const { data, likeReactions } = this.props;
    const { post_activities } = data;
    let reactioncount = [];
    post_activities.map(item => {
      return reactioncount.push(item.pa_at_id);
    });
    this.setState({ totalReactionCounts: reactioncount.length });
  }

  componentWillReceiveProps(nextProps, nextState) {
    console.log(this.props.data, nextProps.data);
    const { data, likeReactions } = nextProps;
    const { post_activities } = data;
    let reactioncount = [];

    post_activities.map(item => {
      return item.pa_at_id !== 0 && reactioncount.push(item.pa_at_id);
    });
    this.setState({ totalReactionCounts: reactioncount.length });
  }

  multipleLikes = () => {
    this.setState({ showreactions: !this.state.showreactions });
  };

  showCurrentReactions = () => {
    const { data, likeReactions } = this.props;
    const { post_activities } = data;
    let reactionId = [];

    post_activities.map(item => {
      return reactionId.push(item.pa_at_id);
    });

    //Taking only unique emo to display

    let uniquereactions = [...new Set(reactionId)];

    return reactionId.map(
      item => {
        const reaction = likeReactions.find(
          reactionItem => reactionItem.at_id === item
        );

        if (reaction) {
          return (
            <DisplayReaction>
              <FacebookEmoji type={reaction.at_name} size="xs" />{' '}
            </DisplayReaction>
          );
        }
      },
      () => console.log('>>>>>>>>>>>>>>>')
    );
  };

  render() {
    // console.log(this.state);
    const { data, modalpopup, user } = this.props;
    const { notifications } = this.props;

    let { post_comments, post_activities } = data;
    post_comments =
      post_comments && post_comments.sort((a, b) => a.pc_id - b.pc_id);
    return (
      <PostWrapper style={{ position: 'relative' }}>
        <ActualPostWrapper>
          <Author data={data} modalpopup={modalpopup} />

          <ActualPost>{this.getContent(data)}</ActualPost>

          <DisplayReaction>
            <div>{this.showCurrentReactions()}</div>
            <div>
              {this.state.totalReactionCounts != 0
                ? this.state.totalReactionCounts
                : null}{' '}
            </div>
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
              </div>{' '}
              <div
                onClick={() => {
                  this.handleReactionClicked('yay');
                }}
              >
                <FacebookEmoji type="yay" size="xs" />
              </div>{' '}
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
          {post_comments &&
            post_comments.map((comment, i) => (
              <Comment key={comment + i} data={comment} />
            ))}
          {this.state.showCommentBox && <CommentBox data={data} />}
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
  onHandleLikeReaction: value =>
    dispatch(PostActivityAction.onGetPostActivitiesReactionTypes(value)),
  onSelectReaction: value =>
    dispatch(PostActivityAction.onSelectReaction(value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SinglePost);
