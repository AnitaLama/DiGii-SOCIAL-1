import React, { Component } from 'react';
import styled from '@emotion/styled';
import Webcam from 'react-webcam';
import { Modal } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import socketClient from 'socket.io-client';
import { grid } from '../../Theme';
import { Button, FormTextArea, Modal as AlertModal } from '../StyledComponents';
import { PostWrapper, PostWrapperContainer } from './index';
import PostActions from '../../Redux/PostRedux';
import LoginActions from '../../Redux/LoginRedux';
import Moderator from './Moderator';

import StrikeActions from '../../Redux/StrikeRedux';
import { SOCKET_URL } from '../../config';

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
      strikeType: null,
      alertMessage: null
    };
    this.socket = socketClient(SOCKET_URL);
  }

  componentWillMount() {
    const { onGetStrikesCountOfAUser, user } = this.props;
    const { isStudent, id } = user.user;
    onGetStrikesCountOfAUser({ isStudent, id });
  }

  componentWillUnmount() {
    this.socket = null;
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
    currentDate = currentDate.getTime();
    // NAME THE IMAGE CAPTURED
    const imageObject = {
      image_name: `${username}-${currentDate}`,
      imageData: imageSrc
    };
    this.setState(prevState => ({
      imageData: imageSrc,
      imageObject,
      fromWebcam: true
    }));
  };

  onClickRetake = e => {
    e.persist();
    this.setState({ imageData: null, imageObject: null });
  };

  handleChange = e => {
    e.persist();
    this.setState({ [e.target.name]: e.target.value });
    this.socket.on('strikes', data => {
      console.log('strikes', data);
    });
  };

  postImage = () => {
    const {
      strike,
      user,
      onBlockUser,
      postText,
      showWarning,
      resetPostType,
      onGetStrikesCountOfAUser,
      submitPost,
      onPostImage
    } = this.props;
    const { postTypeId, imageObject, fromWebcam, file } = this.state;
    const { isStudent, id } = user.user;
    const { strikes } = strike;
    const result = submitPost();
    onGetStrikesCountOfAUser({ isStudent, id });
    let isBad = 0;
    if (result) {
      if (strikes > 8 && isStudent) {
        // BLOCK THE USER
        onBlockUser({ isStudent, id });
      }
      showWarning(strikes, isStudent);
      isBad = 1;
    }
    // const {
    //   imageObject,
    //   fromWebcam,
    //   file,
    //   postTypeId,
    //   postText,
    //   strikeType,
    //   isBad,
    //   blockUser
    // } = this.state;
    // const {
    //   user,
    //   resetPostType,
    //   onPostImage,
    //   onBlockUser,
    //   onGetStrikesCountOfAUser,
    //   strike,
    //   submitPost
    // } = this.props;
    // const { isStudent, id } = user.user;
    // const { strikes } = strike;
    // const result = submitPost();
    // onGetStrikesCountOfAUser({ isStudent, id });
    // // APPEND THE NECESSARY INFO WITH FORMDATA
    if (!fromWebcam) {
      const formData = new FormData();
      formData.append('file', file[0]);
      formData.append('p_pt_id', postTypeId);
      formData.append('isBad', isBad);
      formData.append('p_isStudent', isStudent);
      formData.append('p_actor_id', id);
      formData.append('p_text', postText);
      formData.append('p_is_image', 1);
      formData.append('p_is_bad', isBad);
      formData.append('str_type', result);
      formData.append('str_is_student', isBad);
      formData.append('str_actor_id', isBad);

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
        p_is_image: 1,
        p_is_bad: isBad,
        str_type: result,
        str_is_student: user.user.isStudent,
        str_actor_id: user.user.id
      };
      onPostImage(data);
    }

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
    // this.setState({ isModalVisible: false, alertMessage: null });
  };

  handleCaption = e => {
    const { handlePostText } = this.props;
    handlePostText(e);
  };

  onFocus = () => {
    const { user, disableFirstTimePosting, post, onFocus } = this.props;
    const { posts } = post;
    const { id, isFirstTimePosting } = user.user;
    const checkFirstTimePosting = onFocus(posts, id);

    if (checkFirstTimePosting && isFirstTimePosting) {
      disableFirstTimePosting();
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
    const { postText } = this.props;
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
          <ImageWrapper>
            {!!selectedImage && <img src={selectedImage} alt="selectedImage" />}
            {!!imageObject && (
              <img src={`${imageObject.imageData} `} alt="imageData" />
            )}
            <FormTextArea
              placeholder="Write something..."
              onChange={this.handleCaption}
              onFocus={this.onFocus}
              value={postText}
            />
          </ImageWrapper>

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
  user: PropTypes.object
};
const mapStateToProps = state => ({
  user: state.user,
  strike: state.strike,
  post: state.post
});
const mapDispatchToProps = dispatch => ({
  onPostImage: value => dispatch(PostActions.onPostImage(value)),
  onGetStrikesCountOfAUser: value =>
    dispatch(StrikeActions.onGetStrikesCountOfAUser(value)),
  disableFirstTimePosting: () =>
    dispatch(LoginActions.onDisableFirstTimePosting()),
  onBlockUser: value => dispatch(LoginActions.onBlockUser(value))
});
export default Moderator(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ImagePost)
);
