import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import { FaCaretRight, FaImage, FaSmile } from 'react-icons/fa';
import { MdGif } from 'react-icons/md';
import PropTypes from 'prop-types';
import { Mentions } from 'antd';
import { FormInput, Avatar, Button } from '../../StyledComponents';
import CommentActions from '../../../Redux/CommentRedux';
import LoginActions from '../../../Redux/LoginRedux';
import StrikeActions from '../../../Redux/StrikeRedux';
import PostActions from '../../../Redux/PostRedux';
import GroupActions from '../../../Redux/GroupRedux';
import { Moderator, FeelingsList } from '../../Functions';

import {
  ClickableButton,
  CommentBoxWrapper,
  GifContainer,
  FeelingsDiv,
  FeelingsButton
} from './style';

const { Option } = Mentions;

class CommentBox extends Component {
  state = {
    showGifInput: false,
    gifText: '',
    showFeelings: false,
    usersInGroup: [],
    usersList: [],
    showUsers: false,
    showModal: false,
    alertMessage: null
  };

  componentWillMount() {
    const { onGetStrikesCountOfAUser, user } = this.props;
    const { isStudent, id } = user.user;
    onGetStrikesCountOfAUser({ isStudent, id });
  }

  componentDidMount() {
    const { user, onGetAllUsersOfAGroup, group } = this.props;
    const { groupId } = user.user;
    const { users } = group;
    onGetAllUsersOfAGroup(groupId);
    // this.setState({ usersInGroup: users, usersList: users });
  }

  componentWillReceiveProps(nextProps) {
    const { group } = nextProps;
    const { usersInGroup, usersList } = this.state;

    if (usersInGroup !== group.users) {
      this.setState({ usersInGroup: group.users });
    }
    if (usersList.length === 0 && usersList !== group.users) {
      this.setState({ usersList: group.users });
    }
  }

  componentWillUnmount() {
    // console.log('UNMOUNTED');
  }

  onFocus = () => {
    const {
      user, disableFirstTimePosting, post, onFocus
    } = this.props;
    const { posts } = post;
    const { id, isFirstTimePosting } = user.user;
    const checkFirstTimePosting = onFocus(posts, id, isFirstTimePosting);

    if (checkFirstTimePosting && isFirstTimePosting) {
      disableFirstTimePosting();
    }
  };

  handleKeyDown = e => {
    // //console.log(e.key);
    // //console.log(e.target.selectionStart);
    // //console.log(e.target.selectionEnd);
    // const start = e.target.selectionStart;
    // const { postText } = this.props;
    // //console.log(start, postText, postText[start - 1]);
    // if (e.key === '@') {
    //   this.setState({ showUsers: true });
    // }
    if (e.key === 'Enter') {
      this.handleCommentReply();
    }
  };

  handleComment = e => {
    const { handlePostText } = this.props;
    handlePostText(e);
  };

  handleCommentReply = () => {
    // e.preventDefault();
    const {
      submitPost,
      strike,
      user,
      onBlockUser,
      postText,
      showWarning,
      onGetStrikesCountOfAUser,
      data,
      onSubmitComment,
      resetPostText
      // hideCommentBox
    } = this.props;
    const { postId } = data;
    const { isStudent, id } = user.user;
    const { strikes } = strike;
    const result = submitPost();
    // onGetStrikesCountOfAUser({ isStudent, id });

    let isBad = 0;
    // console.log('submit blacklist', result, strikes);
    if (result) {
      if (strikes > 8 && isStudent) {
        // BLOCK THE USER
        onBlockUser({ isStudent, id });
      }
      showWarning(strikes, isStudent, result, null);

      isBad = 1;
    }

    const comment = {
      postCommentPostId: postId,
      postCommentIsStudent: user.user.isStudent,
      postCommentCommentatorId: user.user.id,
      postCommentTitle: 'Comment',
      postCommentBody: postText,
      isBad,
      postCommentIsBad: isBad,
      strikeType: result,
      strikeIsStudent: user.user.isStudent,
      strikeActorId: user.user.id
    };
    if (postText.length > 0) {
      onSubmitComment(comment);
      // log
      // onGetStrikesCountOfAUser({ isStudent, id });
    }
  };

  handleSelectImage = () => {
    this.fileInput.click();
  };

  selectImage = params => {
    const { onPostImage } = this.props;

    const { user } = this.props.user;

    const { e, data } = params;
    const { postId } = data;
    const { isStudent, id } = user;

    const { files } = e.target;
    this.setState({ file: files });

    const formData = new FormData();
    formData.append('file', files[0]);
    formData.append('postCommentPostId', postId);
    formData.append('pc_isStudent', isStudent);
    formData.append('postCommentCommentatorId', id);
    formData.append('postCommentIsBad', 0);
    formData.append('filename', Date.now() + files[0].name);

    onPostImage(formData);
  };

  handleGifButtonClick = () => {
    this.setState({ showGifInput: true, showFeelings: false }, () => {
      this.gifInput.focus();
    });
  };

  handleGifText = e => {
    const { value } = e.target;
    this.setState({ gifText: value });
  };

  findGif = () => {
    console.log('findgif');
    const { onFindGifForComments } = this.props;
    const { gifText } = this.state;
    this.setState({ showGifInput: true, showFeelings: false });
    const width = window.innerWidth || 1024;
    onFindGifForComments({ text: gifText, limit: width > 960 ? 20 : 12 });
  };

  getGif = () => {
    const { post } = this.props;
    const { commentGif } = post;
    return (
      commentGif
      && commentGif.map(item => (
        <ClickableButton
          key={item.images.downsized_medium.url}
          onClick={() => {
            this.selectAGif(item.images.downsized_medium.url);
          }}
        >
          <img
            src={item.images.downsized_medium.url}
            alt={item.images.downsized_medium.url}
            style={{ height: '60px', width: '60px' }}
          />
        </ClickableButton>
      ))
    );
  };

  selectAGif = gif => {
    const {
      user, onSubmitComment, data, clearCommentGif
    } = this.props;
    const { postId } = data;
    const comment = {
      postCommentPostId: postId,
      postCommentIsStudent: user.user.isStudent,
      postCommentCommentatorId: user.user.id,
      postCommentTitle: 'Comment',
      postCommentImagePath: gif,
      isBad: 0,
      postCommentIsBad: 0,
      strikeType: null,
      strikeIsStudent: user.user.isStudent,
      strikeActorId: user.user.id
    };
    onSubmitComment(comment);
    clearCommentGif();
    this.setState({ showGifInput: false });
  };

  onBlur = () => {
    const { clearCommentGif } = this.props;
    const { gifText } = this.state;
    clearCommentGif();
    this.setState({
      showGifInput: !!(gifText.length > 0),
      showFeelings: false
    });
  };

  handleFeelingsClick = () => {
    this.setState({ showFeelings: true, showGifInput: false });
  };

  handleClickOnFeeling = feeling => {
    const {
      user,
      onBlockUser,
      postText,
      showWarning,
      onGetStrikesCountOfAUser,
      data,
      onSubmitComment,
      resetPostText
    } = this.props;
    const { postId } = data;
    const { isStudent, id } = user.user;
    const comment = {
      postCommentPostId: postId,
      postCommentIsStudent: isStudent,
      postCommentCommentatorId: id,
      postCommentTitle: 'feeling',
      postCommentBody: feeling.name,
      isBad: 0,
      postCommentIsBad: 0
    };
    // //console.log(comment);
    onSubmitComment(comment);
    this.setState({ showFeelings: false });
  };

  // userSelected = value => {
  //   //console.log('here');
  //   const { updatePostText, postText } = this.props;
  //   updatePostText(postText + (value.userName || value.studentUsername));
  //   this.setState({ showUsers: false });
  //   this.commentInput.focus();
  // };

  onChange = value => {
    // //console.log('Change: onchange', value);
    // this.commentInput.focus();
  };

  onSelect = option => {
    const { usersList } = this.state;
    const { updatePostText, postText } = this.props;
    const newArr = usersList.filter(item => {
      const username = item.userName || item.studentUsername;
      return username !== option.value;
    });
    updatePostText(postText + option.value);
    this.setState({ showUsers: false, usersList: newArr });
  };

  render() {
    const {
      usersList,
      showUsers,
      showFeelings,
      showGifInput,
      showModal,
      alertMessage
    } = this.state;
    const { postText, user, data } = this.props;
    const { avatar } = user.user;
    return (
      <CommentBoxWrapper
        style={{
          position: 'relative'
        }}
      >
        <Avatar avatar={avatar} height={20} />
        <div onKeyDown={this.handleKeyDown}>
          <Mentions
            style={{ width: '100%' }}
            onChange={this.handleComment}
            onSelect={this.onSelect}
            placeholder="Write a comment"
            ref={r => {
              this.commentInput = r;
            }}
            value={postText}
          >
            {usersList.map(users => (
              <Option
                key={users.userName || users.studentUsername}
                value={users.userName || users.studentUsername}
                // onClick={() => {
                //   this.userSelected(users);
                // }}
              >
                {users.userName || users.studentUsername}
              </Option>
            ))}
          </Mentions>
        </div>

        <GifContainer
          style={{
            bottom: '30px',
            display: showFeelings ? 'block' : 'none'
          }}
        >
          <FeelingsDiv>
            {FeelingsList.map(feeling => (
              <FeelingsButton
                onClick={() => {
                  this.handleClickOnFeeling(feeling);
                }}
                key={feeling.name}
              >
                {feeling.name}
                {feeling.emoji}
              </FeelingsButton>
            ))}
          </FeelingsDiv>
        </GifContainer>
        <GifContainer
          style={{
            display: showGifInput ? 'block' : 'none'
          }}
        >
          {this.getGif()}
          <div>
            <FormInput
              placeholder="Find Gif"
              onChange={this.handleGifText}
              onBlur={this.onBlur}
              ref={r => {
                this.gifInput = r;
              }}
            />
            <Button onClick={this.findGif} className="findButton rounded short">
              Find
            </Button>
          </div>
        </GifContainer>
        <div className="buttonDiv">
          <input
            type="file"
            multiple={false}
            ref={r => {
              this.fileInput = r;
            }}
            style={{ display: 'none' }}
            onChange={e => this.selectImage({ e, data, user })}
          />
          <button type="submit" onClick={this.handleSelectImage}>
            <FaImage />
          </button>
          <button type="submit" onClick={this.handleGifButtonClick}>
            <MdGif />
          </button>
          <button type="submit" onClick={this.handleFeelingsClick}>
            <FaSmile />
          </button>
          <button type="submit" onClick={this.handleCommentReply}>
            <FaCaretRight />
          </button>
        </div>
      </CommentBoxWrapper>
    );
  }
}

CommentBox.propTypes = {
  strike: PropTypes.object,
  user: PropTypes.object,
  post: PropTypes.object,
  onGetStrikesCountOfAUser: PropTypes.func,
  disableFirstTimePosting: PropTypes.func,
  onGetAllUsersOfAGroup: PropTypes.func,
  group: PropTypes.object,
  onFocus: PropTypes.func,
  postText: PropTypes.string,
  handlePostText: PropTypes.func,
  submitPost: PropTypes.func,
  onBlockUser: PropTypes.func,
  showWarning: PropTypes.func,
  onSubmitComment: PropTypes.func,
  resetPostText: PropTypes.func,
  data: PropTypes.object,
  updatePostText: PropTypes.func,
  onPostImage: PropTypes.func
};

const mapStateToProps = state => ({
  postActivity: state.postActivity,
  user: state.user,
  post: state.post,
  strike: state.strike,
  group: state.group
});

const mapDispatchToProps = dispatch => ({
  onSubmitComment: value => dispatch(CommentActions.onSubmitCommentRequest(value)),
  onGetStrikesCountOfAUser: value => dispatch(StrikeActions.onGetStrikesCountOfAUser(value)),
  disableFirstTimePosting: () => dispatch(LoginActions.onDisableFirstTimePosting()),
  onBlockUser: value => dispatch(LoginActions.onBlockUser(value)),
  onFindGifForComments: value => dispatch(PostActions.onFindGifForComments(value)),
  clearCommentGif: () => dispatch(PostActions.clearCommentGif()),
  onPostImage: value => dispatch(PostActions.onPostImage(value)),
  onGetAllUsersOfAGroup: value => dispatch(GroupActions.onGetAllUsersOfAGroup(value))
});

export default Moderator(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CommentBox)
);
