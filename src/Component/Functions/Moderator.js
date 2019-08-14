import React, { Component } from 'react';
// import history from '../../history';
import { Modal, VideoModal } from '../StyledComponents';
import { FilterKeyWords, Warnings } from './index';

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
      showVideo: false
    };
  }

    resetPostText = () => {
      this.setState({ postText: '' });
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
          isModalVisible: true,
          alertMessage: 'Please limit the number of characters to 250'
        });
      }
      this.setState({ postText: value });
    };

    submitPost = () => {
      const { postText } = this.state;
      const blacklistedWord = FilterKeyWords(postText);
      return blacklistedWord;
    };

    showWarning = (count, isStudent) => {
      console.log('strike count', count);
      if ((count + 1) % strikeCount === 0) {
        console.log(' shhow video');
      }
      this.setState({ showVideo: true }, () => {
        // this.fullscreenVideo.webkitEnterFullScreen();
      });
      // if (count >= 9) {
      //   this.setState({
      //     isModalVisible: true,
      //     alertMessage: 'You\'ll be blocked from  DiGii'
      //   });
      // } else {
      //   let index = (count % strikeCount) + 1;
      //   index -= 1;
      //
      //   this.setState({
      //     isModalVisible: true,
      //     alertMessage: `${Warnings[index]}`
      //   });
      // }
    };

    onFocus = (posts, userId) => {
      const isFirstTimePosting = posts.find(item => item.p_actor_id === userId);
      if (!isFirstTimePosting) {
        this.setState({
          isModalVisible: true,
          alertMessage: 'Congratulations!!! it\'s your first time posting.'
        });
      }
      return isFirstTimePosting;
    };

    hideModal = () => {
      this.setState({ isModalVisible: false });
    };

    render() {
      const { isModalVisible, alertMessage, showVideo } = this.state;
      return (
        <div>
          {showVideo && <VideoModal />}
          <WrappedComponent
            {...this.props}
            {...this.state}
            submitPost={this.submitPost}
            handlePostText={this.handlePostText}
            showWarning={this.showWarning}
            onFocus={this.onFocus}
            resetPostText={this.resetPostText}
            updatePostText={this.updatePostText}
          />
          {isModalVisible && (
            <Modal
              message={alertMessage}
              hideModal={this.hideModal}
              showCheckButton
            />
          )}
        </div>
      );
    }
};

export default Moderator;
