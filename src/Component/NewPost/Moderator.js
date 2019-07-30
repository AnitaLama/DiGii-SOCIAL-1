import React, { Component } from 'react';
// import history from '../../history';
import { Modal } from '../StyledComponents';
import { FilterKeyWords, warnings } from './index';

const strikeCount = 3;

const Moderator = WrappedComponent => class ModeratorContainer extends Component {
  constructor() {
    super();
    this.state = {
      postText: '',
      isBad: false,
      blockUser: false,
      isModalVisible: false,
      alertMessage: 'hey'
    };
  }

    handlePostText = e => {
      console.log('handlechange');
      const { value } = e.target;
      const actualValue = value.trim();
      if (actualValue.length > 500) {
        this.setState({
          isModalVisible: true,
          alertMessage: 'Please limit the number of characters to 500'
        });
      }
      this.setState({ postText: value });
    };

    submitPost = () => {
      console.log('submit');
      const { postText } = this.state;
      const blacklistedWord = FilterKeyWords(postText);
      return blacklistedWord;
    };

    showWarning = (count, isStudent) => {
      if (count >= 9) {
        console.log('inside  warning', count);
        this.setState({
          isModalVisible: true,
          alertMessage: 'You\'ll be blocked from  DiGii'
        });
      } else {
        let index = (count % strikeCount) + 1;
        index -= 1;
        this.setState({
          isModalVisible: true,
          alertMessage: `${warnings[index]}`
        });
      }
    };

    onFocus = (posts, userId) => {
      console.log('focus');
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
      const { isModalVisible, alertMessage } = this.state;
      console.log(isModalVisible);
      return (
        <div>
          <WrappedComponent
            {...this.props}
            {...this.state}
            submitPost={this.submitPost}
            handlePostText={this.handlePostText}
            showWarning={this.showWarning}
            onFocus={this.onFocus}
          />
          {isModalVisible && (
            <Modal message={alertMessage} hideModal={this.hideModal} />
          )}
        </div>
      );
    }
};

export default Moderator;
