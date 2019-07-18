import React, { Component } from 'react';
import styled from '@emotion/styled';
import Webcam from 'react-webcam';
import { Modal } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { grid } from '../../Theme';
import { Button, FormTextArea, Modal as AlertModal } from '../StyledComponents';
import { FilterKeyWords, warnings, PostWrapper } from './index';
import PostActions from '../../Redux/PostRedux';
import LoginActions from '../../Redux/LoginRedux';
import StrikeActions from '../../Redux/StrikeRedux';

const strikeCount = 3;

const PhotoOptionContainer = styled.div`
  height: 100%;
`;
const ImageWrapper = styled.div`
  display: flex;
  img {
    height: 100px;
  }
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
      isWebcamModalVisible: false,
      isModalVisible: false,
      postTypeId: props.postTypeId,
      imageObject: null,
      showPostButton: false,
      selectedImage: null,
      fromWebcam: false,
      fileName: '',
      postText: '',
      isBad: false,
      strikeType: null
    };
  }

  switchOnWebcam = () => {
    this.setState({ isWebcamModalVisible: true });
  };

  handleOk = () => {
    this.setState({
      isWebcamModalVisible: false,
      showPostButton: true,
      fromWebcam: true
    });
  };

  handleCancel = () => {
    this.setState({ isWebcamModalVisible: false });
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
      fromWebcam,
      selectedImage,
      fileName,
      file,
      postTypeId,
      postText,
      strikeType,
      isBad
    } = this.state;
    const { user } = this.props;
    const { isStudent, id } = user.user;
    const { onPostImage } = this.props;
    if (!fromWebcam) {
      const formData = new FormData();
      formData.append('file', file[0]);
      formData.append('p_pt_id', postTypeId);
      formData.append('isBad', isBad);
      formData.append('p_isStudent', isStudent);
      formData.append('p_actor_id', id);
      formData.append('p_text', postText);
      formData.append('str_type', strikeType);
      onPostImage(formData);
    } else {
      const data = {
        file: imageObject.imageData,
        fileName: imageObject.image_name,
        fileFrom: 'webcam',
        p_isStudent: isStudent,
        p_actor_id: id,
        p_pt_id: postTypeId,
        p_text: postText,
        isBad,
        str_type: strikeType
      };
      onPostImage(data);
    }
    this.setState({
      imageObject: null,
      selectedImage: null,
      isBad: false,
      alertMessage: null,
      strikeType: null
    });
    setTimeout(() => {
      // resetPostType();
    }, 3000);
  };

  selectImage = e => {
    this.setState({
      selectedImage: URL.createObjectURL(e.target.files[0]),
      showPostButton: true,
      fromWebcam: false,
      fileName: e.target.files[0].name,
      file: e.target.files
    });
  };

  hideModal = () => {
    this.setState({ isModalVisible: false, alertMessage: null });
  };

  handleCaption = e => {
    const { onGetStrikesCountOfAUser, user } = this.props;
    const { isStudent, id } = user.user;
    onGetStrikesCountOfAUser({ isStudent, id });
    const { value } = e.target;
    if (value[value.length - 1] === '@' && value[value.length - 1] === ' ') {
      // console.log('show users');
    }
    const { strike } = this.props;
    if (value.trim().length > 500) {
      this.setState({
        isModalVisible: true,
        alertMessage: 'Please keep the length within 500 characters'
      });
      // alert('Please keep the length within 500 characters');
      this.setState({ postText: value, hasPost: value.trim().length > 0 });
    } else {
      const blacklistedWord = FilterKeyWords(value);

      if (blacklistedWord) {
        if (strike.strikes >= 10) {
          console.log('block the student');
          this.setState({ blockUser: true });
          // onBlockUser({ isStudent, id });
        } else {
          let index = strike.strikes < 10 && (strike.strikes % strikeCount) + 1;
          index -= 1;
          this.setState({
            isModalVisible: true,
            alertMessage: `${warnings[index]}`
          });
        }
        this.setState({ isBad: true, strikeType: blacklistedWord });
      } else {
        this.setState({
          isModalVisible: false,
          alertMessage: null
        });
      }
      this.setState({ postText: value, hasPost: value.trim().length > 0 });
    }
  };

  render() {
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: 'user'
    };
    const { isModalVisible, alertMessage } = this.state;
    return (
      <PostWrapper>
        <PhotoOptionContainer>
          {!!this.state.selectedImage && (
            <ImageWrapper>
              <img src={this.state.selectedImage} alt="selectedImage" />
              <FormTextArea
                placeholder="Write something..."
                onChange={this.handleCaption}
              />
            </ImageWrapper>
          )}
          {!!this.state.imageObject && (
            <ImageWrapper>
              <img
                src={`${this.state.imageObject.imageData} `}
                alt="imageData"
              />
              <FormTextArea
                placeholder="Write something..."
                onChange={this.handleCaption}
              />
            </ImageWrapper>
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
            visible={this.state.isWebcamModalVisible}
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
            {this.state.isWebcamModalVisible && (
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
        {isModalVisible && (
          <AlertModal message={alertMessage} hideModal={this.hideModal} />
        )}
      </PostWrapper>
    );
  }
}

ImagePost.propTypes = {
  strike: PropTypes.object,
  user: PropTypes.object,
  post: PropTypes.object,
  onPostImage: PropTypes.func,
  onGetStrikesCountOfAUser: PropTypes.func,
  disableFirstTimePosting: PropTypes.func
};
const mapStateToProps = state => ({
  postActivity: state.postActivity,
  user: state.user,
  post: state.post,
  strike: state.strike
});
const mapDispatchToProps = dispatch => ({
  onPostImage: value => dispatch(PostActions.onPostImage(value)),
  onGetStrikesCountOfAUser: value => dispatch(StrikeActions.onGetStrikesCountOfAUser(value)),
  disableFirstTimePosting: () => dispatch(LoginActions.onDisableFirstTimePosting()),
  onBlockUser: value => dispatch(LoginActions.onBlockUser(value))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImagePost);
