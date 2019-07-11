import React, { Component } from 'react';
import styled from '@emotion/styled';
import { flexCentering } from '../../Theme';
import { Button } from '../StyledComponents';
import { ImagePost, VideoPost, PostWrapper } from './index';

const PhotoVideoPostWrapper = styled.div`
  ${flexCentering()};
  height: 100%;
`;
class PhotoVideoPost extends Component {
  constructor() {
    super();
    this.state = {
      type: null
    };
  }

  handleButtonClick = type => {
    this.setState({ type });
  };

  render() {
    const { type } = this.state;
    if (type === 'photo') {
      return <ImagePost props={this.props} />;
    }
    if (type === 'video') {
      return <VideoPost props={this.props} />;
    }
    return (
      <PostWrapper>
        <PhotoVideoPostWrapper>
          <Button
            className="roundedShadow"
            onClick={() => {
              this.handleButtonClick('photo');
            }}
          >
            Photo
          </Button>
          <Button
            className="roundedShadow"
            onClick={() => {
              this.handleButtonClick('video');
            }}
          >
            Video
          </Button>
        </PhotoVideoPostWrapper>
      </PostWrapper>
    );
  }
}

export default PhotoVideoPost;
