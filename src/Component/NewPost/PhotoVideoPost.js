import React, { Component } from 'react';
import styled from '@emotion/styled';
import { Button } from '../StyledComponents';
import { ImagePost, VideoPost, PostWrapperContainer } from './index';

const PhotoVideoPostWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  min-height: 120px;
  div {
    width: 90%;
  }
`;
class PhotoVideoPost extends Component {
  constructor() {
    super();
    this.state = {
      type: null
    };
  }

  handleButtonClick = type => {
    console.log('type', type);
    this.setState({ type });
  };

  render() {
    const { type } = this.state;
    if (type === 'photo') {
      return <ImagePost {...this.props} />;
    }
    if (type === 'video') {
      return <VideoPost {...this.props} />;
    }
    return (
      <PostWrapperContainer>
        <PhotoVideoPostWrapper>
          <div>
            <Button
              className="roundedShadow"
              onClick={() => {
                this.handleButtonClick('photo');
              }}
            >
              Photo
            </Button>
          </div>
          <div>
            <Button
              className="roundedShadow"
              onClick={() => {
                this.handleButtonClick('video');
              }}
            >
              Video
            </Button>
          </div>
        </PhotoVideoPostWrapper>
      </PostWrapperContainer>
    );
  }
}

export default PhotoVideoPost;
