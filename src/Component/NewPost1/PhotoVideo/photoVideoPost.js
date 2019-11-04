import React, { Component } from 'react';
import { Button } from '../../StyledComponents';
import { ImagePost, VideoPost } from './index';
import { PostWrapperContainer } from '../index';
import { PhotoVideoPostWrapper } from './style';

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
