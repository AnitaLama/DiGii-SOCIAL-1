import React, { Component } from 'react';
import styled from '@emotion/styled';
import Webcam from 'react-webcam';
import { Modal } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { grid } from '../../Theme';
import { Button, FormTextArea, Modal as AlertModal } from '../StyledComponents';
import {
  FilterKeyWords,
  warnings,
  PostWrapper,
  PostWrapperContainer
} from './index';
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
    currentDate = Date.getTime();
    // NAME THE IMAGE CAPTURED
    const imageObject = {
      image_name: `${username}-${currentDate}`,
      imageData: imageSrc
    };
    this.setState(prevState => ({
      imageData: imageSrc,
      imageObject
    }));
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

      file,
      postTypeId,
      postText,
      strikeType,
      isBad
    } = this.state;
    const { user, resetPostType } = this.props;
    const { isStudent, id } = user.user;
    const { onPostImage } = this.props;
    // APPEND THE NECESSARY INFO WITH FORMDATA
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
      // IMAGE CAPTURED VIA WEBCAM
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
    resetPostType();
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

    const { strike } = this.props;
    // LIMIT LENGTH OF POST TO 500
    if (value.trim().length > 500) {
      this.setState({
        isModalVisible: true,
        alertMessage: 'Please keep the length within 500 characters'
      });
      this.setState({ postText: value });
    } else {
      const blacklistedWord = FilterKeyWords(value);

      if (blacklistedWord) {
        if (strike.strikes >= 10) {
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
      this.setState({ postText: value });
    }
  };

  render() {
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: 'user'
    };
    const {
      isModalVisible,
      alertMessage,
      selectedImage,
      imageObject,
      isWebcamModalVisible
    } = this.state;
    if (!selectedImage && !imageObject) {
      return (
        <PostWrapperContainer>
          <PhotoOptionContent>
            <input type="file" multiple="" onChange={this.selectImage} />
            <div style={{ textAlign: 'center' }}>
              <Button className="rounded short" onClick={this.switchOnWebcam}>
                Take a picture
              </Button>
            </div>
          </PhotoOptionContent>
          <Modal
            title="Take a new picture"
            visible={isWebcamModalVisible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={[
              <Button
                className="rounded"
                type="submit"
                onClick={this.capture}
                key="cpature"
              >
                Capture
              </Button>
            ]}
          >
            {isWebcamModalVisible && (
              <div>
                {!imageObject && (
                  <Webcam
                    audio={false}
                    height={350}
                    ref={r => (this.webcam = r)}
                    screenshotFormat="image/jpeg"
                    width={350}
                    videoConstraints={videoConstraints}
                  />
                )}
                {!!imageObject && (
                  <div>
                    <img
                      src={`${imageObject.imageData} `}
                      alt={`${imageObject.imageData} `}
                    />
                  </div>
                )}
              </div>
            )}
          </Modal>
        </PostWrapperContainer>
      );
    }
    return (
      <PostWrapper>
        <PhotoOptionContainer>
          {!!selectedImage && (
            <ImageWrapper>
              <img src={selectedImage} alt="selectedImage" />
              <FormTextArea
                placeholder="Write something..."
                onChange={this.handleCaption}
              />
            </ImageWrapper>
          )}
          {!!imageObject && (
            <ImageWrapper>
              <img src={`${imageObject.imageData} `} alt="imageData" />
              <FormTextArea
                placeholder="Write something..."
                onChange={this.handleCaption}
              />
            </ImageWrapper>
          )}

          {!imageObject && !selectedImage && (
            <PhotoOptionContent>
              <input type="file" multiple="" onChange={this.selectImage} />
              <div style={{ textAlign: 'center' }}>
                <Button className="rounded short" onClick={this.switchOnWebcam}>
                  Take a picture
                </Button>
              </div>
            </PhotoOptionContent>
          )}
        </PhotoOptionContainer>
        <div>
          <Button className="rounded small" onClick={this.postImage}>
            Post
          </Button>
        </div>
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
