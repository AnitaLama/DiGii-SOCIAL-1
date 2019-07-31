import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { FormTextArea, Button, Modal } from '../StyledComponents';
import { FilterKeyWords, warnings, PostWrapper } from './index';
import { Colors } from '../../Theme';
import PostActions from '../../Redux/PostRedux';
import LoginActions from '../../Redux/LoginRedux';
import StrikeActions from '../../Redux/StrikeRedux';
import Moderator from './Moderator';

const strikeCount = 3;

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
      showPostButton: false,
      selectedGif: props.selectedGif,
      caption: '',
      isModalVisible: false,
      isBad: false,
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

  // hideModal = () => {
  //   this.setState({
  //     isModalVisible: false,
  //     alertMessage: null
  //   });
  // };

  handleInputChange = e => {
    const { value } = e.target;

    this.setState({ searchText: value });
    const hasFilteredWords = FilterKeyWords(value);
    console.log('filtered word', hasFilteredWords);

    this.setState({ showPostButton: !hasFilteredWords });
  };

  showButton = () => {
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
      onGetStrikesCountOfAUser
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
      showWarning(strikes, isStudent);
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
      p_pt_id: postTypeId,
      p_body: selectedGif.images.downsized_medium.url,
      p_isStudent: isStudent,
      p_actor_id: id,
      p_text: postText,
      p_is_bad: isBad
    };
    onPostSubmit(data);
    // if (blockUser) {
    //   onBlockUser({ isStudent, id });
    // }
    // resetPostType();
    // this.setState({ selectedGif: null });
  };

  removeGif = () => {
    this.setState({ selectedGif: null });
  };

  handleCaptionText = e => {
    const { handlePostText } = this.props;
    handlePostText(e);

    // const { onGetStrikesCountOfAUser, user } = this.props;
    // const { isStudent, id } = user.user;
    // onGetStrikesCountOfAUser({ isStudent, id });
    // const { value } = e.target;
    // if (value[value.length - 1] === '@' && value[value.length - 1] === ' ') {
    //   console.log('show users');
    // }
    // const { strike } = this.props;
    // if (value.trim().length > 500) {
    //   this.setState({
    //     isModalVisible: true,
    //     alertMessage: 'Please keep the length within 500 characters'
    //   });
    //   // alert('Please keep the length within 500 characters');
    //   this.setState({ caption: value, hasPost: value.trim().length > 0 });
    // } else {
    //   const blacklistedWord = FilterKeyWords(value);
    //   console.log(strike.strikes);
    //   if (blacklistedWord) {
    //     if (strike.strikes >= 9) {
    //       console.log('block the student');
    //       // onBlockUser({ isStudent, id });
    //       this.setState({
    //         blockUser: true,
    //         isModalVisible: true,
    //         alertMessage: 'You\'ll be blocked'
    //       });
    //     } else {
    //       let index = strike.strikes < 10 && (strike.strikes % strikeCount) + 1;
    //       index -= 1;
    //       this.setState({
    //         isModalVisible: true,
    //         alertMessage: `${warnings[index]}`
    //       });
    //     }
    //     this.setState({ isBad: true, strikeType: blacklistedWord });
    //   } else {
    //     this.setState({
    //       isModalVisible: false,
    //       alertMessage: null
    //     });
    //   }
    //   this.setState({ caption: value });
    // }
  };

  onFocus = () => {
    const {
      user, disableFirstTimePosting, post, onFocus
    } = this.props;
    const { posts } = post;
    const { id, isFirstTimePosting } = user.user;
    const checkFirstTimePosting = onFocus(posts, id);

    if (checkFirstTimePosting && isFirstTimePosting) {
      disableFirstTimePosting();
    }
  };

  render() {
    const { selectedGif, isModalVisible, alertMessage } = this.state;

    if (!selectedGif) {
      return (
        <PostWrapper>
          <Input>
            <input
              onFocus={this.showButton}
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
            onFocus={this.onFocus}
          />
        </GifInputForm>
        <div>
          <Button className="rounded small" onClick={this.submitPost}>
            Post
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
