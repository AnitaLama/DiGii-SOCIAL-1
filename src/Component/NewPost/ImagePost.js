import React, { Component } from 'react';
import styled from '@emotion/styled';
import Webcam from 'react-webcam';
import { Modal } from 'antd';
import { connect } from 'react-redux';
import { grid } from '../../Theme';
import { Button } from '../StyledComponents';
import { PostWrapper } from './index';
import PostActions from '../../Redux/PostRedux';

const PhotoOptionContainer = styled.div`
  height: 100%;
`;
const PhotoOptionContent = styled.div`
  ${grid(2, '1fr')};
  height: 100%;
  align-items: center;
`;
class ImagePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageData: null,
      image_name: '',
      isModalVisible: false,
      postTypeId: props.postTypeId,
      imageObject: null,
      showPostButton: false,
      selectedImage: null,
      fromWebcam: false,
      fileName: ''
    };
  }

  switchOnWebcam = () => {
    this.setState({ isModalVisible: true });
  };

  handleOk = () => {
    this.setState({
      isModalVisible: false,
      showPostButton: true,
      fromWebcam: true
    });
  };

  handleCancel = () => {
    this.setState({ isModalVisible: false });
  };

  capture = e => {
    const { user } = this.props;
    const { username } = user.user;
    const imageSrc = this.webcam.getScreenshot();
    let currentDate = new Date();
    currentDate = Date.parse(currentDate) + new Date(currentDate).toLocaleString();
    currentDate = currentDate.replace(/\s/g, '');

    const imageObject = {
      image_name: `${username}-${currentDate}`,
      imageData: imageSrc
    };
    this.setState(prevState => ({
      imageData: imageSrc,
      imageObject
    }));
    // this.setState({ imageData: imageSrc });
  };

  onClickRetake = e => {
    e.persist();
    this.setState({ imageData: null, imageObject: null });
  };

  handleChange = e => {
    e.persist();
    this.setState({ [e.target.name]: e.target.value });
  };

  postImage = () => {
    const {
      imageObject,
      postTypeId,
      fromWebcam,
      selectedImage,
      fileName
    } = this.state;
    const { onPostImage, user, resetPostType } = this.props;
    const { isStudent, id } = user.user;

    const data = {
      file: fromWebcam ? imageObject.imageData : selectedImage,
      fileName: fromWebcam ? `${imageObject.image_name}` : `${fileName}`,
      fileFrom: fromWebcam ? 'webcam' : ''
    };
    const post = {
      p_pt_id: postTypeId,
      p_body: fromWebcam ? `${imageObject.image_name}` : `${fileName}`,
      p_isStudent: isStudent,
      p_actor_id: id,
      isBad: false
    };
    onPostImage(data);
    setTimeout(() => {
      // resetPostType();
      this.setState({ imageObject: null, selectedImage: null });
    }, 3000);
  };

  selectImage = e => {
    this.setState({
      selectedImage: URL.createObjectURL(e.target.files[0]),
      showPostButton: true,
      fromWebcam: false,
      fileName: e.target.files[0].name
    });
  };

  render() {
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: 'user'
    };
    return (
      <PostWrapper>
        <PhotoOptionContainer>
          {!!this.state.selectedImage && <img src={this.state.selectedImage} />}
          {!!this.state.imageObject && (
            <div>
              <img src={`${this.state.imageObject.imageData} `} />
            </div>
          )}

          {!this.state.imageObject && !this.state.selectedImage && (
            <PhotoOptionContent>
              <input type="file" multiple="" onChange={this.selectImage} />
              <div style={{ textAlign: 'center' }}>
                <Button className="rounded short" onClick={this.switchOnWebcam}>
                  Take a picture
                </Button>
              </div>
            </PhotoOptionContent>
          )}
          <Modal
            title="Take a new picture"
            visible={this.state.isModalVisible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={
              !this.state.imageObject
                ? [
                  <button type="submit" onClick={this.capture}>
                      Capture
                  </button>,
                  <button type="submit" onClick={this.onClickRetake}>
                      Retake
                  </button>
                ]
                : [
                  <button type="submit" onClick={this.handleOk}>
                      Save
                  </button>,
                  <button type="submit" onClick={this.onClickRetake}>
                      Retake
                  </button>
                ]
            }
          >
            {this.state.isModalVisible && (
              <div>
                {!this.state.imageObject && (
                  <Webcam
                    audio={false}
                    height={350}
                    ref={r => (this.webcam = r)}
                    screenshotFormat="image/jpeg"
                    width={350}
                    videoConstraints={videoConstraints}
                  />
                )}
                {!!this.state.imageObject && (
                  <div>
                    {console.log('inside render', this.state.imageObject)}
                    <img src={`${this.state.imageObject.imageData} `} />
                  </div>
                )}
              </div>
            )}
          </Modal>
        </PhotoOptionContainer>
        {this.state.showPostButton && (
          <div>
            <Button className="rounded small" onClick={this.postImage}>
              Post
            </Button>
          </div>
        )}
      </PostWrapper>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});
const mapDispatchToProps = dispatch => ({
  onPostImage: value => dispatch(PostActions.onPostImage(value))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImagePost);
