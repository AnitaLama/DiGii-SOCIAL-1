import React, { Component } from 'react';
import styled from '@emotion/styled';
// import VideoRecorder from 'react-video-recorder';
import ReactMediaRecorder from 'react-media-recorder';
import { flexCentering, Images } from '../../Theme';

const VideoPostWrapper = styled.div`
  ${flexCentering()};
  height: 100%;
`;

const DisconnectedView = () => (
  <div>
    <img src={Images.digii5.Video} />
  </div>
);
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

  render() {
    return (
      <VideoPostWrapper>
        <ReactMediaRecorder
          video
          render={({
            status, startRecording, stopRecording, mediaBlob
          }) => (
            <div>
              <p>{status}</p>
              <video
                src={mediaBlob}
                controls
                style={{
                  height: '200px',
                  width: '200px'
                }}
              />
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
        {/*  here video
        <video
          src={this.state.videoSrc}
          controls
          style={{
            height: '200px',
            width: '200px'
          }}
        /> */}
      </VideoPostWrapper>
    );
  }
}

export default VideoPost;
