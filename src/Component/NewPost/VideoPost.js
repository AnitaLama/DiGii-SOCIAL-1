import React, { Component } from "react";
import VideoRecorder from "react-video-recorder";
import styled from "@emotion/styled";
import { flexCentering } from "../../Theme";
import { connect } from "react-redux";
import PostActions from "../../Redux/PostRedux";

const VideoPostWrapper = styled.div`
  ${flexCentering()};
  height: 100%;
`;

class VideoPost extends Component {
  constructor() {
    super();
    this.state = {
      videoSrc: null
    };
  }

  actionHandler = data => {
    const urlCreator = window.URL || window.webkitURL;
    console.log("Camera on off", data);

    const videoUrl = urlCreator.createObjectURL(data);
    console.log("VideoURL", videoUrl);

    this.props.onVideoPost(data);
  };

  render() {
    const VideoDisplay = () => (
      <video
        src={this.state.videoSrc}
        controls
        // style={{
        //   height: "200px",
        //   width: "200px"
        // }}
      />
    );

    if (this.state.videoSrc) {
      return <div>{VideoDisplay()}</div>;
    }

    const handleRecordingComplete = (
      videoBlob,
      startedAt,
      thumbnailBlob,
      duration
    ) => {
      const urlCreator = window.URL || window.webkitURL;
      const thumbUrl =
        thumbnailBlob && urlCreator.createObjectURL(thumbnailBlob);
      const videoUrl = urlCreator.createObjectURL(videoBlob);

      console.log("Video Blob", videoBlob.size, videoBlob, videoUrl);
      console.log("Thumb Blob", thumbnailBlob, thumbUrl);
      console.log("Started:", startedAt);
      console.log("Duration:", duration);

      this.setState({ videoSrc: videoUrl }, () => {
        console.log("State properties", this.state.videoSrc);
      });
    };
    return (
      <VideoPostWrapper>
        <VideoRecorder
          onRecordingComplete={handleRecordingComplete}
          renderLoadingView={VideoDisplay}
          // onOpenVideoInput={this.actionHandler}
          // onStopReplaying={this.actionHandler}
          // onError={this.actionHandler}
        />
      </VideoPostWrapper>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  onVideoPost: value => dispatch(PostActions.onVideoPost(value))
});

export default connect(
  null,
  mapDispatchToProps
)(VideoPost);
