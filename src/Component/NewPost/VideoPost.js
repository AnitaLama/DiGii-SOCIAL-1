import React, { Component } from 'react';
import VideoRecorder from 'react-video-recorder';
import styled from '@emotion/styled';

import { connect } from 'react-redux';
import { flexCentering } from '../../Theme';
import PostActions from '../../Redux/PostRedux';
import { FormTextArea, Button } from '../StyledComponents';
import { PostWrapper } from './index';
import LoginActions from '../../Redux/LoginRedux';
import StrikeActions from '../../Redux/StrikeRedux';
import { Moderator } from '../Functions';

const VideoPostWrapper = styled.div`
  ${flexCentering()};
  height: 100%;
`;
const VideoDisplayWrapper = styled.div`
  display: flex;
`;
class VideoPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postTypeId: props.postTypeId,
      username: props.username,
      description: '',
      videoSrc: '',
      video: null
    };
  }

  handleRecordingComplete = (videoBlob, startedAt, thumbnailBlob, duration) => {
    const urlCreator = window.URL || window.webkitURL;
    const videoUrl = urlCreator.createObjectURL(videoBlob);
    this.setState({ videoSrc: videoUrl, video: videoBlob });
  };

  VideoDisplay = () => (
    <video
      src={this.state.videoSrc}
      controls
      style={{
        height: '200px',
        width: '200px'
      }}
    />
  );

  submitPost = () => {
    const {
      strike,
      user,
      onBlockUser,
      postText,
      showWarning,
      resetPostType,
      onGetStrikesCountOfAUser,
      submitPost,
      onVideoPost
    } = this.props;
    const { postTypeId, username, video } = this.state;
    const { isStudent, id } = user.user;
    const { strikes } = strike;
    const result = submitPost();
    onGetStrikesCountOfAUser({ isStudent, id });
    let isBad = 0;
    if (result) {
      if (strikes > 8 && isStudent) {
        // BLOCK THE USER
        onBlockUser({ isStudent, id });
      }
      showWarning(strikes, isStudent);
      isBad = 1;
    }

    const formData = new FormData();
    const currentDate = new Date();

    formData.append('file', video);
    formData.append('name', username + currentDate.getTime());
    formData.append('id', id);
    formData.append('isStudent', isStudent);
    formData.append('description', postText);
    formData.append('postTypeId', postTypeId);
    formData.append('isBad', isBad);
    formData.append('p_is_bad', isBad);
    formData.append('str_type', result);
    formData.append('str_is_student', isBad);
    formData.append('str_actor_id', isBad);
    onVideoPost(formData);
    resetPostType();
  };

  handleDescriptionChange = e => {
    const { handlePostText } = this.props;
    handlePostText(e);
    // this.setState({ description: e.target.value });
  };

  onFocus = () => {
    const {
      user, disableFirstTimePosting, post, onFocus
    } = this.props;
    const { posts } = post;
    const { id, isFirstTimePosting } = user.user;
    const checkFirstTimePosting = onFocus(posts, id);

    if (checkFirstTimePosting && isFirstTimePosting) {
      disableFirstTimePosting();
    }
  };

  render() {
    if (this.state.videoSrc) {
      return (
        <PostWrapper>
          <VideoDisplayWrapper>
            {this.VideoDisplay()}
            <FormTextArea
              placeholder="Write something..."
              onChange={this.handleDescriptionChange}
              onFocus={this.onFocus}
            />
          </VideoDisplayWrapper>
          <div>
            <Button className="rounded small" onClick={this.submitPost}>
              Post
            </Button>
          </div>
        </PostWrapper>
      );
    }

    return (
      <VideoPostWrapper>
        <VideoRecorder
          onRecordingComplete={this.handleRecordingComplete}
          renderLoadingView={this.VideoDisplay}
          // onOpenVideoInput={this.actionHandler}
          // onStopReplaying={this.actionHandler}
          // onError={this.actionHandler}
        />
      </VideoPostWrapper>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  strike: state.strike,
  post: state.post
});
const mapDispatchToProps = dispatch => ({
  onVideoPost: value => dispatch(PostActions.onVideoPost(value)),
  onGetStrikesCountOfAUser: value => dispatch(StrikeActions.onGetStrikesCountOfAUser(value)),
  disableFirstTimePosting: () => dispatch(LoginActions.onDisableFirstTimePosting()),
  onBlockUser: value => dispatch(LoginActions.onBlockUser(value))
});

export default Moderator(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(VideoPost)
);
