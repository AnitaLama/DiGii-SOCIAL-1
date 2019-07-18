import React, { Component } from 'react';
import styled from '@emotion/styled';
// import VideoRecorder from 'react-video-recorder';
import ReactMediaRecorder from 'react-media-recorder';
import { connect } from 'react-redux';
import { flexCentering } from '../../Theme';
import PostActions from '../../Redux/PostRedux';

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

  onChange = () => {
    const video = this.videoPlayerContainer;

    const url = URL.createObjectURL(this.state.videoSrc);
    video.src = url;
    video.load();
    video.onloadeddata = function () {
      video.play();
    };
  };

  submitPost = () => {
    const { videoSrc } = this.state;
    const formData = new FormData();
    formData.append('file', videoSrc);
    this.props.onPostImage(formData);
  };

  render() {
    const { videoSrc } = this.state;
    console.log('videoSrc', videoSrc);
    if (videoSrc) {
      return (
        <div>
          <video
            src={videoSrc}
            controls
            style={{
              height: '200px',
              width: '200px'
            }}
          />
          <div>
            <button onClick={this.submitPost}>Post</button>
          </div>
        </div>
      );
    }
    return (
      <VideoPostWrapper>
        <ReactMediaRecorder
          video
          render={({
            status, startRecording, stopRecording, mediaBlob
          }) => (
            <div>
              <p>{status}</p>

              <div>
                <button
                  onClick={() => {
                    startRecording();
                    console.log('mediaBlob', mediaBlob);
                  }}
                >
                  Start Recording
                </button>
                <button onClick={stopRecording}>Stop Recording</button>
                <button
                  onClick={() => {
                    console.log(mediaBlob);
                    this.setState({ videoSrc: mediaBlob });
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          )}
        />
      </VideoPostWrapper>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onPostImage: value => dispatch(PostActions.onPostImage(value))
});
export default connect(
  null,
  mapDispatchToProps
)(VideoPost);
