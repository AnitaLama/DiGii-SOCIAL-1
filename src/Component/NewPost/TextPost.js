import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FormTextArea, Modal, Button } from '../StyledComponents';
import { FilterKeyWords, warnings, PostWrapper } from './index';
import PostActions from '../../Redux/PostRedux';
import LoginActions from '../../Redux/LoginRedux';
import StrikeActions from '../../Redux/StrikeRedux';

const strikeCount = 3;
class TextPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isBad: false,
      isModalVisible: false,
      alertmessage: null,
      postText: '',
      hasPost: false,
      username: props.username,
      postTypeId: props.postTypeId,
      blockUser: false
    };
  }

  componentWillMount() {
    const { onGetStrikesCountOfAUser, user } = this.props;
    const { isStudent, id } = user.user;
    onGetStrikesCountOfAUser({ isStudent, id });
  }

  hideModal = () => {
    this.setState({
      isModalVisible: false,
      alertMessage: null
    });
  };

  handlePostText = e => {
    const { onGetStrikesCountOfAUser, user } = this.props;
    const { isStudent, id } = user.user;
    onGetStrikesCountOfAUser({ isStudent, id });
    const { value } = e.target;
    if (value[value.length - 1] === '@' && value[value.length - 1] === ' ') {
      console.log('show users');
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
      console.log(strike.strikes);
      if (blacklistedWord) {
        if (strike.strikes >= 9) {
          console.log('block the student');
          this.setState({ blockUser: true });
          // onBlockUser({ isStudent, id });
          this.setState({
            blockUser: true,
            isModalVisible: true,
            alertMessage: 'You\'ll be blocked'
          });
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

  showHasPost = () => {
    const { user, disableFirstTimePosting, post } = this.props;
    const { posts } = post;
    // console.log(posts);
    const isFirstTimePosting = posts.find(
      item => item.p_actor_id === user.user.id
    );
    if (
      user.user.isStudent
      && !isFirstTimePosting
      && user.user.isFirstTimePosting
    ) {
      disableFirstTimePosting();
      this.setState({
        isModalVisible: true,
        alertMessage: 'Congratulations!!! it\'s your first time posting.'
      });

      // alert('Congratulations!!! it\'s your first time posting.');
    }
    this.setState({
      hasPost: true
    });
  };

  hideHasPost = () => {
    const { postText } = this.state;
    this.setState({
      hasPost: !!postText
    });
  };

  submitTextPost = async () => {
    const {
      postText, isBad, postTypeId, strikeType, blockUser
    } = this.state;
    const {
      user, onPostSubmit, resetPostType, onBlockUser
    } = this.props;
    const { isStudent, id } = user.user;
    const post = {
      p_pt_id: postTypeId,
      p_body: postText,
      p_isStudent: isStudent,
      p_actor_id: id,
      isBad,
      str_type: strikeType
    };
    await onPostSubmit(post);
    this.setState({ postText: '', isBad: false });
    resetPostType();
    if (blockUser) {
      onBlockUser({ isStudent, id });
    } // onBlockUser()
  };

  render() {
    const {
      isModalVisible,
      alertMessage,
      hasPost,
      username,
      postText
    } = this.state;
    return (
      <PostWrapper>
        <FormTextArea
          placeholder={`What do you want to post, ${username}?`}
          style={{ margin: 0 }}
          onChange={this.handlePostText}
          onFocus={this.showHasPost}
          onBlur={this.hideHasPost}
          value={postText}
        />
        {isModalVisible && (
          <Modal message={alertMessage} hideModal={this.hideModal} />
        )}
        {hasPost && (
          <div>
            <Button className="rounded small" onClick={this.submitTextPost}>
              Post
            </Button>
          </div>
        )}
      </PostWrapper>
    );
  }
}

TextPost.propTypes = {
  strike: PropTypes.object,
  user: PropTypes.object,
  post: PropTypes.object,
  onPostSubmit: PropTypes.func,
  onGetStrikesCountOfAUser: PropTypes.func,
  disableFirstTimePosting: PropTypes.func
};
const mapStateToProps = state => ({
  user: state.user,
  postActivity: state.postActivity,
  post: state.post,
  strike: state.strike
});
const mapDispatchToProps = dispatch => ({
  onPostSubmit: value => dispatch(PostActions.onPostSubmit(value)),
  onGetStrikesCountOfAUser: value => dispatch(StrikeActions.onGetStrikesCountOfAUser(value)),
  disableFirstTimePosting: () => dispatch(LoginActions.onDisableFirstTimePosting()),
  onBlockUser: value => dispatch(LoginActions.onBlockUser(value))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TextPost);
