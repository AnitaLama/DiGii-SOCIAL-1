import React, { Component } from 'react';
import styled from '@emotion/styled';
import Webcam from 'react-webcam';
import { Modal } from 'antd';
import { grid } from '../../Theme';
import { Button } from '../StyledComponents';

const PhotoOptionContainer = styled.div`
  height: 100%;
`;
const PhotoOptionContent = styled.div`
  ${grid(2, '1fr')};
  height: 100%;
  align-items: center;
`;
class ImagePost extends Component {
  constructor() {
    super();
    this.state = {
      imageData: null,
      image_name: '',
      saveImage: false,
      isModalVisible: false
    };
  }

  switchOnWebcam = () => {
    this.setState({ isModalVisible: true });
  };

  handleOk = () => {
    this.setState({ isModalVisible: false });
  };

  handleCancel = () => {
    this.setState({ isModalVisible: false });
  };

  setRef = webcam => {
    this.webcam = webcam;
  };

  capture = () => {
    const imageSrc = this.webcam.getScreenshot();
    this.setState({ imageData: imageSrc });
  };

  onClickRetake = e => {
    e.persist();
    this.setState({ imageData: null });
  };

  onClickSave = e => {
    e.persist();

    this.setState(prevState => ({ saveImage: !prevState.saveImage }));
  };

  handleChange = e => {
    e.persist();
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSaveSubmit = e => {
    const { image_name, imageData } = this.state;
    const { onSaveImage } = this.props;
    e.preventDefault();
    const imageObject = {
      image_name,
      imageData
    };
    // console.log(imageObject);
    onSaveImage(imageData);
  };

  saveForm = () => (
    <div>
      <form onSubmit={this.handleSaveSubmit}>
        <p>
          <label>Image name: </label>
          <input
            type="text"
            name="image_name"
            value={this.state.image_name}
            onChange={this.handleChange}
          />
          <input type="submit" value="Save" />
        </p>
      </form>
    </div>
  );

  render() {
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: 'user'
    };
    return (
      <PhotoOptionContainer>
        <PhotoOptionContent>
          <input type="file" multiple="" />
          <div style={{ textAlign: 'center' }}>
            <Button className="rounded short" onClick={this.switchOnWebcam}>
              Take a picture
            </Button>
          </div>
        </PhotoOptionContent>
        <Modal
          title="Reset new password"
          visible={this.state.isModalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <button type="submit" onClick={this.capture}>
              Capture
            </button>,
            <button type="submit" onClick={this.onClickRetake}>
              Retake
            </button>,
            <button type="submit" onClick={this.onClickSave}>
              Save
            </button>
          ]}
        >
          <Webcam
            audio={false}
            height={350}
            ref={this.setRef}
            screenshotFormat="image/jpeg"
            width={350}
            videoConstraints={videoConstraints}
          />
          {this.state.saveImage ? this.saveForm() : null}
        </Modal>
      </PhotoOptionContainer>
    );
  }
}

export default ImagePost;
