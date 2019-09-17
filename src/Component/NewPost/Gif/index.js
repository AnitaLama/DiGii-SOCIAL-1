import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { FormTextArea, Button, Loader } from '../../StyledComponents';
import { PostWrapper } from '../index';
import { Colors } from '../../../Theme';
import PostActions from '../../../Redux/PostRedux';
import LoginActions from '../../../Redux/LoginRedux';
import StrikeActions from '../../../Redux/StrikeRedux';
import { Moderator, FilterKeyWords } from '../../Functions';

const { primary } = Colors.colors;
const GifInputForm = styled.div`
  display: flex;
`;
const Input = styled.div`
  input {
    border: 0;
    outline: 0;
  }
`;
const GifImage = styled.img`
  height: 70px;
  width: 70px;
`;
const CloseButton = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  color: ${primary};
  cursor: pointer;
  margin-top: -14px;
  margin-right: -8px;
`;
class GifContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postTypeId: props.postTypeId,
      searchText: '',
      selectedGif: props.selectedGif,
      isModalVisible: false,
      alertMessage: null
    };
  }

  componentWillMount() {
    const { onGetStrikesCountOfAUser, user } = this.props;
    const { isStudent, id } = user.user;
    onGetStrikesCountOfAUser({ isStudent, id });
  }

  componentWillReceiveProps(nextProps) {
    const { selectedGif } = this.state;
    if (
      this.props.selectedGif !== nextProps.selectedGif
      && selectedGif !== nextProps.selectedGif
    ) {
      this.setState({ selectedGif: nextProps.selectedGif });
    }
  }

  handleInputChange = e => {
    const { value } = e.target;

    this.setState({ searchText: value });
    const hasFilteredWords = FilterKeyWords(value);
    // console.log('filtered word', hasFilteredWords);

    this.setState({ showPostButton: !hasFilteredWords });
  };

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

  showButton = () => {
    const { user, disableFirstTimePosting, post } = this.props;
    const { posts } = post;
    // console.log(posts);
    const isFirstTimePosting = posts.find(
      item => item.postActorId === user.user.id
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

  findGif = () => {
    const { searchText } = this.state;
    const { onFindGif } = this.props;
    onFindGif(searchText);
  };

  submitPost = () => {
    const {
      submitPost,
      strike,
      user,
      onBlockUser,
      postText,
      onPostSubmit,
      showWarning,
      resetPostType,
      onGetStrikesCountOfAUser,
      resetSelectedGif
    } = this.props;
    const { postTypeId, selectedGif } = this.state;
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

    // const {
    //   postTypeId, selectedGif, caption, blockUser
    // } = this.state;
    // const {
    //   user, onPostSubmit, resetPostType, onBlockUser
    // } = this.props;
    // const { isStudent, id } = user.user;
    //
    const data = {
      postPostTypeId: postTypeId,
      postBody: selectedGif.images.downsized_medium.url,
      postIsStudent: isStudent,
      postActorId: id,
      postText,
      postIsBad: isBad,
      isBad,
      strikeType: result,
      strikeIsStudent: user.user.isStudent,
      strikeActorId: user.user.id
    };
    this.props.saveImage(selectedGif.images.downsized_medium.url);
    resetSelectedGif();
    onPostSubmit(data);
    // if (blockUser) {
    //   onBlockUser({ isStudent, id });
    // }
    if (!isBad) {
      resetPostType();
    }
    // this.setState({ selectedGif: null });
  };

  removeGif = () => {
    this.setState({ selectedGif: null });
  };

  handleCaptionText = e => {
    const { handlePostText } = this.props;
    handlePostText(e);
  };

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

  render() {
    const { selectedGif } = this.state;
    const { post } = this.props;
    if (!selectedGif) {
      return (
        <PostWrapper>
          <Input>
            <FormTextArea
              onFocus={this.onFocus}
              onChange={this.handleInputChange}
              placeholder="Find a gif"
            />
          </Input>
          <div>
            <Button className="rounded small short" onClick={this.findGif}>
              Find
            </Button>
          </div>
        </PostWrapper>
      );
    }
    // SHOW SELECTED GIF IN THE POST BOX
    return (
      <PostWrapper>
        <GifInputForm>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <GifImage src={selectedGif.images.downsized_medium.url} />
            <CloseButton onClick={this.removeGif}>
              <FaTimes />
            </CloseButton>
          </div>
          <FormTextArea
            placeholder="Write something..."
            onChange={this.handleCaptionText}
          />
        </GifInputForm>
        <div>
          <Button className="rounded small" onClick={this.submitPost}>
            {!post.posting ? 'Post' : <Loader />}
          </Button>
        </div>
      </PostWrapper>
    );
  }
}

GifContainer.propTypes = {
  postTypeId: PropTypes.number,
  user: PropTypes.object,
  onFindGif: PropTypes.func,
  onPostSubmit: PropTypes.func,
  resetPostType: PropTypes.func
};
const mapStateToProps = state => ({
  user: state.user,
  strike: state.strike,
  postActivity: state.postActivity,
  post: state.post
});
const mapDispatchToProps = dispatch => ({
  onFindGif: value => dispatch(PostActions.onFindGif(value)),
  onPostSubmit: value => dispatch(PostActions.onPostSubmit(value)),
  disableFirstTimePosting: () => dispatch(LoginActions.onDisableFirstTimePosting()),
  onBlockUser: value => dispatch(LoginActions.onBlockUser(value)),
  onGetStrikesCountOfAUser: value => dispatch(StrikeActions.onGetStrikesCountOfAUser(value))
});
export default Moderator(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(GifContainer)
);
