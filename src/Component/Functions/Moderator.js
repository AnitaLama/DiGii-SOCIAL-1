import React, { Component } from 'react';
// import history from '../../history';
import PropTypes from 'prop-types';
import { Modal, VideoModal, StrikesModal } from '../StyledComponents';
import { FilterKeyWords } from './index';

const strikeCount = 3;

const Moderator = WrappedComponent => class ModeratorContainer extends Component {
  constructor() {
    super();
    this.state = {
      postText: '',
      isBad: false,
      blockUser: false,
      isModalVisible: false,
      alertMessage: '',
      showVideo: false,
      moderationType: null,
      alertIndex: -1,
      isStrikeModalVisible: false,
      imageName: null,
      feeling: null,
      banner: null
    };
  }

    saveImage = img => {
      this.setState({ imageName: img });
    };

    saveFeelings = feeling => {
      this.setState({ feeling });
    };

    saveBanner = banner => {
      this.setState({ banner });
    };

    resetPostText = () => {
      this.setState({ postText: '' });
    };

    updatePostText = newText => {
      this.setState({ postText: `${newText} ` });
    };

    handlePostText = e => {
      const { value } = e.target;
      const actualValue = value.trim();
      if (actualValue.length > 250) {
        this.setState({
          isBasicModalVisible: true,
          alertMessage: 'Please limit the number of characters to 250'
        });
      }
      this.setState({ postText: value });
    };

    submitPost = () => {
      const { postText } = this.state;
      const blacklistedWord = FilterKeyWords(postText);
      this.setState({ moderationType: blacklistedWord });
      return blacklistedWord;
    };

    showWarning = (count, isStudent, moderationType, msg) => {
      if (msg) {
        this.setState({
          isModalVisible: true,
          alertMessage: msg
        });
      } else if (count >= strikeCount * 3) {
        this.setState({
          isBasicModalVisible: true,
          alertMessage: 'You\'ll be blocked from  DiGii'
        });
      } else {
        let index = (count % strikeCount) + 1;
        index -= 1;
        this.setState({
          isModalVisible: true,
          alertIndex: index,
          // alertMessage: `${Warnings[index]}`
          alertMessage: null
        });
      }
    };

    onFocus = (posts, userId, isFirstTime) => {
      // const isFirstTimePosting = posts.find(
      //   item => item.postActorId === userId
      // );
      if (isFirstTime) {
        this.setState({
          isBasicModalVisible: true,
          alertMessage: 'Congratulations!!! it\'s your first time posting.'
        });
      }
    };

    hideBasicModal = () => {
      this.setState({ isBasicModalVisible: false });
    };

    hideModal = () => {
      this.setState({ isModalVisible: false, postText: '' });
      // console.log('inside modal', strike);
      // if strike % 3 !== 0  , reset the post type else dont do anything
      this.resetPost();
    };

    hideStrikesModal = () => {
      this.setState({ isStrikeModalVisible: false });
      // console.log('inside modal', strike);
      // if strike % 3 !== 0  , reset the post type else dont do anything
      this.resetPost();
    };

    resetPost = () => {
      const { resetPostType } = this.props;
      resetPostType && resetPostType();
    };

    hideVideoModal = () => {
      this.setState({ showVideo: false, isModalVisible: false });
    };

    showVideo = () => {
      this.setState({ showVideo: true, isModalVisible: false });
    };

    render() {
      const {
        isModalVisible,
        isBasicModalVisible,
        alertMessage,
        showVideo,
        moderationType,
        alertIndex,
        postText,
        imageName,
        feeling,
        banner
      } = this.state;
      return (
        <div>
          {showVideo && (
            <VideoModal type={moderationType} hideModal={this.hideVideoModal} />
          )}
          <WrappedComponent
            {...this.props}
            {...this.state}
            submitPost={this.submitPost}
            handlePostText={this.handlePostText}
            showWarning={this.showWarning}
            onFocus={this.onFocus}
            resetPostText={this.resetPostText}
            updatePostText={this.updatePostText}
            saveImage={this.saveImage}
            saveFeelings={this.saveFeelings}
            saveBanner={this.saveBanner}
          />
          {isModalVisible && (
            <StrikesModal
              message={alertMessage}
              hideModal={this.hideModal}
              showVideo={this.showVideo}
              index={alertIndex}
              showCheckButton
              postText={postText}
              imageName={imageName}
              feeling={feeling}
              banner={banner}
            />
          )}
          {isBasicModalVisible && (
            <Modal
              message={alertMessage}
              hideModal={this.hideBasicModal}
              showVideo={this.showVideo}
              index={alertIndex}
            />
          )}
        </div>
      );
    }
};

Moderator.propTypes = {
  resetPostType: PropTypes.func
};
export default Moderator;
