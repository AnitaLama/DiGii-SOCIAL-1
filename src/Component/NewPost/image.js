import React, { Component } from 'react';
import { FiUpload } from 'react-icons/fi';
import { ImageUploadWrapper } from './style';

class ImagePost extends Component {
  render() {
    return (
      <div>
        <ImageUploadWrapper>
          <FiUpload />
        </ImageUploadWrapper>
      </div>
    );
  }
}

export default ImagePost;
