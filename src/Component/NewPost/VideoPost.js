import React, { Component } from "react";
import VideoRecorder from "react-video-recorder";
import styled from "@emotion/styled";

import { connect } from "react-redux";
import { flexCentering } from "../../Theme";
import PostActions from "../../Redux/PostRedux";
import { FormTextArea, Button } from "../StyledComponents";
import { PostWrapper } from "./index";

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
      videoSrc: null,
      postTypeId: props.postTypeId,
      username: props.username,
      description: "",
      videoSrc: "",
      video: null
    };
  }

  handleRecordingComplete = (videoBlob, startedAt, thumbnailBlob, duration) => {
    const { postTypeId, username } = this.state;
    const { user } = this.props;
    const { isStudent, id } = user.user;
    const urlCreator = window.URL || window.webkitURL;
    const thumbUrl = thumbnailBlob && urlCreator.createObjectURL(thumbnailBlob);
    const videoUrl = urlCreator.createObjectURL(videoBlob);

    this.setState({ videoSrc: videoUrl, video: videoBlob });
  };

  VideoDisplay = () => (
    <video
      src={this.state.videoSrc}
      controls
      style={{
        height: "200px",
        width: "200px"
      }}
    />
  );

  submitPost = () => {
    const formData = new FormData();
    const currentDate = new Date();
    const { postTypeId, username } = this.state;
    const { user, resetPostType } = this.props;
    const { isStudent, id } = user.user;
    const { video, videoSrc, description } = this.state;
    formData.append("file", video);
    formData.append("name", username + currentDate.getTime());
    formData.append("id", id);
    formData.append("isStudent", isStudent);
    formData.append("description", description);
    formData.append("postTypeId", postTypeId);
    this.props.onVideoPost(formData);
    setTimeout(() => {
      resetPostType();
    }, 3000);
  };

  handleDescriptionChange = e => {
    this.setState({ description: e.target.value });
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
  user: state.user
});
const mapDispatchToProps = dispatch => ({
  onVideoPost: value => dispatch(PostActions.onVideoPost(value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoPost);
