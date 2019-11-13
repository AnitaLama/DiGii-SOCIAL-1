import React, { Component } from 'react';
import { FiUpload } from 'react-icons/fi';
import { FaTimes } from 'react-icons/fa';
import { ImageUploadWrapper, ImageWrapper } from './style';

class ImagePost extends Component {
  handleUpload = () => {
    this.imageInput.click();
  };

  render() {
    const {
      handleImagePostSelect,
      imagePost,
      deleteSelectedImage
    } = this.props;
    if (imagePost) {
      return (
        <div>
          <ImageUploadWrapper>
            <ImageWrapper>
              <img
                src={imagePost}
                style={{ height: '100px' }}
                alt={imagePost}
              />
              <span>
                <FaTimes onClick={deleteSelectedImage} />
              </span>
            </ImageWrapper>
          </ImageUploadWrapper>
        </div>
      );
    }
    return (
      <div>
        <ImageUploadWrapper onClick={this.handleUpload}>
          <FiUpload />
          <input
            type="file"
            onChange={handleImagePostSelect}
            ref={r => (this.imageInput = r)}
          />
        </ImageUploadWrapper>
      </div>
    );
  }
}

export default ImagePost;
