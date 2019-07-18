import React, { Component } from 'react';
import styled from '@emotion/styled';
import { Button } from '../StyledComponents';
import { ImagePost, VideoPost, PostWrapper } from './index';

const PhotoVideoPostWrapper = styled.div`
  display: grid;
  grid-template-columns: 45% 45%;
  grid-column-gap: 5%;
  div {
    margin: auto;
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
      <PostWrapper>
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
      </PostWrapper>
    );
  }
}

export default PhotoVideoPost;
