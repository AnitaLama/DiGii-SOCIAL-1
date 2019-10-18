import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FormTextArea, Button, Loader } from '../../StyledComponents';
import { PostWrapper } from '../index';
import PostActions from '../../../Redux/PostRedux';
import LoginActions from '../../../Redux/LoginRedux';
import StrikeActions from '../../../Redux/StrikeRedux';
import { Moderator } from '../../Functions';

class TextPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.username,
      postTypeId: props.postTypeId
    };
  }

  componentWillMount() {
    const { onGetStrikesCountOfAUser, user } = this.props;
    const { isStudent, id } = user.user;
    onGetStrikesCountOfAUser({ isStudent, id });
  }

  componentDidUpdate(prevProps) {
    console.log(
      'component did update',
      this.props.user.user.totalActivities,
      prevProps.user.user.totalActivities
    );
  }

  componentWillUnmount() {
    console.log('componnetwillunmount activated');
  }

  handlePostText = e => {
    const { handlePostText, user, onGetStrikesCountOfAUser } = this.props;
    const { isStudent, id } = user.user;
    onGetStrikesCountOfAUser({ isStudent, id });
    handlePostText(e);
  };

  onFocus = () => {
    const {
      user, disableFirstTimePosting, post, onFocus
    } = this.props;
    const { posts } = post;
    const { id, isFirstTimePosting } = user.user;
    onFocus(posts, id, isFirstTimePosting);
    if (isFirstTimePosting) {
      disableFirstTimePosting();
    }
  };

  submitTextPost = () => {
    const {
      submitPost,
      strike,
      user,
      onBlockUser,
      postText,
      onPostSubmit,
      showWarning,
      resetPostText,
      post,
      options,
      updateTotalActivities
    } = this.props;
    const { page, pageSize } = post;

    const { postTypeId } = this.state;
    const { isStudent, id, totalActivities } = user.user;
    const { educationalChallengeActivityCount } = options;

    const showEducationalChallenge = totalActivities % (educationalChallengeActivityCount - 1) === 0;
    const { strikes } = strike;
    const result = submitPost();
    // onGetStrikesCountOfAUser({ isStudent, id });
    let isBad = 0;
    if (result) {
      if (strikes > 8 && isStudent) {
        // BLOCK THE USER
        onBlockUser({ isStudent, id });
      }
      showWarning(strikes, isStudent, result, null);
      isBad = 1;
    } else {
      updateTotalActivities();
    }
    const postToBeSubmitted = {
      postPostTypeId: postTypeId,
      postText,
      postIsStudent: isStudent,
      postActorId: id,
      postIsBad: isBad,
      isBad,
      strikeType: result,
      strikeIsStudent: user.user.isStudent,
      strikeActorId: user.user.id,
      page,
      pageSize
    };
    if (postText.trim().length > 0 && postText.trim().length < 250) {
      if (totalActivities % (educationalChallengeActivityCount - 1) === 0) {
        // console.log('show educational challenge now');
        this.props.showEducationalChallenge();
        setTimeout(() => {
          onPostSubmit(postToBeSubmitted);
          resetPostText();
        }, 1500);
      } else {
        onPostSubmit(postToBeSubmitted);

        setTimeout(() => {
          resetPostText();
        }, 1500);
      }

      console.log('props values', user, options);
    }
  };

  render() {
    const { username } = this.state;
    const { postText, post } = this.props;

    return (
      <PostWrapper>
        <FormTextArea
          placeholder={`What do you want to post, ${username}?`}
          style={{ margin: 0 }}
          onChange={this.handlePostText}
          onFocus={this.onFocus}
          value={postText}
          ref={r => (this.inputArea = r)}
        />

        <div>
          <Button className="rounded small" onClick={this.submitTextPost}>
            {!post.posting ? 'Post' : <Loader />}
          </Button>
        </div>
      </PostWrapper>
    );
  }
}

TextPost.propTypes = {
  username: PropTypes.string,
  postTypeId: PropTypes.number,
  onFocus: PropTypes.func,
  strike: PropTypes.object,
  user: PropTypes.object,
  post: PropTypes.object,
  onPostSubmit: PropTypes.func,
  onGetStrikesCountOfAUser: PropTypes.func,
  disableFirstTimePosting: PropTypes.func,
  submitPost: PropTypes.func,
  onBlockUser: PropTypes.func,
  postText: PropTypes.string,
  showWarning: PropTypes.func,
  resetPostText: PropTypes.func,
  handlePostText: PropTypes.func
};
const mapStateToProps = state => ({
  user: state.user,
  post: state.post,
  strike: state.strike,
  options: state.options.options
});
const mapDispatchToProps = dispatch => ({
  onPostSubmit: value => dispatch(PostActions.onPostSubmit(value)),
  updateTotalActivities: () => dispatch(LoginActions.updateTotalActivities()),
  onGetStrikesCountOfAUser: value => dispatch(StrikeActions.onGetStrikesCountOfAUser(value)),
  disableFirstTimePosting: () => dispatch(LoginActions.onDisableFirstTimePosting()),
  onBlockUser: value => dispatch(LoginActions.onBlockUser(value))
});
export default Moderator(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TextPost)
);
