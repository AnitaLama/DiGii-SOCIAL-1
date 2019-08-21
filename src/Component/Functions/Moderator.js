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
      isStrikeModalVisible: false
    };
  }

    checkImageName = filename => {
      const check = FilterKeyWords(filename);
      return check;
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
      console.log('strike count', count, moderationType);
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
        console.log('alertMessage', index);
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
      console.log('hide basic modal');
      this.setState({ isBasicModalVisible: false });
    };

    hideModal = () => {
      this.setState({ isModalVisible: false });
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
      resetPostType();
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
        postText
      } = this.state;
      console.log('inside moderator', this.state.postText);
      return (
        <div>
          {showVideo && (
            <VideoModal
              type={moderationType}
              hideModal={this.hideVideoModal}
              text={postText}
            />
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
            checkImageName={this.checkImageName}
          />
          {isModalVisible && (
            <StrikesModal
              message={alertMessage}
              hideModal={this.hideModal}
              showVideo={this.showVideo}
              index={alertIndex}
              showCheckButton
              postText={postText}
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
