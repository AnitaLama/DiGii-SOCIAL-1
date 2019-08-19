import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import { FaCaretRight, FaImage, FaSmile } from 'react-icons/fa';
import { MdGif } from 'react-icons/md';
import PropTypes from 'prop-types';
import { FormInput, Avatar, Button } from '../StyledComponents';
import CommentActions from '../../Redux/CommentRedux';
import LoginActions from '../../Redux/LoginRedux';
import StrikeActions from '../../Redux/StrikeRedux';
import PostActions from '../../Redux/PostRedux';
import GroupActions from '../../Redux/GroupRedux';
import { Colors } from '../../Theme';
import { Moderator, FeelingsList } from '../Functions';

const {
  snow, primary, secondary, pencil
} = Colors.colors;

const ClickableButton = styled.div``;
const UserList = styled.ul`
  list-style-type: none;
  background: white;
  min-width: 150px;
  padding: 0;
  margin: 0;
  height: ${props => (props.height ? `${props.height}px` : '130px')};

  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 0.25em;
  }
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px ${pencil};
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${secondary};
    outline: 1px solid ${secondary};
  }
`;
const UserListElement = styled.li`
  padding: 4px 10px;
  &:hover {
    cursor: pointer;
    background-image: linear-gradient(to right, ${primary}, ${secondary});
    color: ${snow};
  }
`;
const CommentBoxWrapper = styled.div`
  display: grid;
  grid-template-columns: 20px auto;
  width: 100%;
  position: relative;
  button:not(.findButton) {
    background: none;
    border: 0;
    outline: 0;
    width: auto;
  }
  .findButton {
    height: 45px;
  }
  input {
    padding: 10px;
  }
  .buttonDiv {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    vertical-align: ;
    color: grey;
    button {
      height: 10px;
      svg {
        height: 14px;
      }
    }
  }
`;
const GifContainer = styled.div`
  maxheight: 250px;
  width: 100%;
  position: absolute;
  bottom: 0;
  zindex: 1;
  div {
    display: flex;
  }
`;
const FeelingsDiv = styled.div`
  display: grid !important;
  grid-template-columns: repeat(3, auto);
  background: rgba(52, 52, 52, 0.7);
  border: 1px solid black;
  border-radius: 20px;
  color: ${snow};
  span {
    margin: auto;
    cursor: pointer;
  }
`;
const FeelingsButton = styled.span``;
class CommentBox extends Component {
  state = {
    showGifInput: false,
    gifText: '',
    showFeelings: false,
    usersInGroup: [],
    showUsers: false
  };

  componentWillMount() {
    const { onGetStrikesCountOfAUser, user } = this.props;
    const { isStudent, id } = user.user;
    onGetStrikesCountOfAUser({ isStudent, id });
  }

  componentDidMount() {
    this.commentInput.focus();
    const { user, onGetAllUsersOfAGroup, group } = this.props;
    const { groupId } = user.user;
    const { users } = group;
    onGetAllUsersOfAGroup(groupId);
    this.setState({ usersInGroup: users });
  }

  componentWillReceiveProps(nextProps) {
    const { group } = nextProps;
    const { users } = this.state;
    if (users !== group.users) {
      this.setState({ usersInGroup: group.users });
    }
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
    // console.log(e.key);
    // console.log(e.target.selectionStart);
    // console.log(e.target.selectionEnd);
    const start = e.target.selectionStart;
    const { postText } = this.props;
    console.log(start, postText, postText[start - 1]);
    if (e.key === '@') {
      this.setState({ showUsers: true });
    }
    if (e.key === 'Enter') {
      this.handleCommentReply();
    }
  };

  handleComment = e => {
    const { handlePostText } = this.props;
    handlePostText(e);
  };

  handleCommentReply = () => {
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
    } = this.props;
    const { postId } = data;
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
      resetPostText();
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
    this.setState({ showGifInput: true }, () => {
      this.gifInput.focus();
    });
  };

  handleGifText = e => {
    const { value } = e.target;
    this.setState({ gifText: value });
  };

  findGif = () => {
    const { onFindGifForComments } = this.props;
    const { gifText } = this.state;
    this.setState({ showGifInput: true });
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
    console.log('selectgif', data);
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
    console.log(comment);
    onSubmitComment(comment);
    clearCommentGif();
    this.setState({ showGifInput: false });
  };

  onBlur = () => {
    const { clearCommentGif } = this.props;
    const { gifText } = this.state;
    clearCommentGif();
    this.setState({ showGifInput: !!(gifText.length > 0) });
  };

  handleFeelingsClick = () => {
    this.setState({ showFeelings: true });
  };

  handleClickOnFeeling = feeling => {
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
    // console.log(comment);
    onSubmitComment(comment);
    this.setState({ showFeelings: false });
  };

  userSelected = value => {
    const { updatePostText, postText } = this.props;
    updatePostText(postText + (value.userName || value.studentUsername));
    this.setState({ showUsers: false });
    this.commentInput.focus();
  };

  render() {
    const {
      usersInGroup, showUsers, showFeelings, showGifInput
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

        <FormInput
          placeholder="Write a comment"
          onChange={this.handleComment}
          onKeyDown={this.handleKeyDown}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          style={{ height: '24px', marginLeft: '6px', marginBottom: 0 }}
          value={postText}
          ref={r => {
            this.commentInput = r;
          }}
        />
        <GifContainer
          style={{
            bottom: '24px',
            left: '30px',
            display: showUsers ? 'block' : 'none',
            zIndex: 2
          }}
        >
          <UserList>
            {usersInGroup.map(users => (
              <UserListElement
                key={users.userName || users.studentUsername}
                onClick={() => {
                  this.userSelected(users);
                }}
              >
                {users.userName || users.studentUsername}
              </UserListElement>
            ))}
          </UserList>
        </GifContainer>

        <GifContainer
          style={{
            bottom: '20px',
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
