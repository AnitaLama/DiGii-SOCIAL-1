import React, { Component } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostActions from '../../Redux/PostRedux';
import LoginActions from '../../Redux/LoginRedux';
import PostActivityActions from '../../Redux/PostActivityRedux';
import PostTypeActions from '../../Redux/PostTypeRedux';
import { Avatar, Button, Modal } from '../StyledComponents';
import {
  grid,
  fontSize,
  flexCentering,
  Colors,
  Images,
  boxShadow,
  fontWeight,
  fontFilson
} from '../../Theme';

import { NewPostType, FilterKeyWords, warnings } from './index';

const { snow, pencil, grey } = Colors.colors;

const NewPostWrapper = styled.div`
  background: ${snow};
  margin: 10px 0;
  padding: 20px;
  border-radius: 40px;
  ${boxShadow()}
`;
const NewPostContainer = styled.div`
  display: grid;
  // grid-template-columns: 95% 5%;
`;
const Icon = styled.span`
  margin: auto;
  cursor: pointer;
  img {
    height: 20.73px;
    margin-right: 4px;
  }
`;
const NewPostOptionContainer = styled.div`
  ${grid(6, '1fr')};
`;
const NewPostOptionContent = styled.div`
  margin: auto;
  padding: 2px 0;
  cursor: pointer;
  ${flexCentering('row')};
  span {
    color: ${pencil};
    ${fontSize(12)};
    ${fontFilson()};
  }
  &:hover {
    span {
      ${fontWeight('500')};
      color: ${grey};
    }
  }

  @media (max-width: 840px) {
    ${flexCentering('column')};
    span:last-of-type {
      text-align: center;
      ${fontSize(10)};
    }
  }
`;
const NewPostOption = ({ option, handleButtonClick }) => {
  const { icon, text } = option;
  return (
    <NewPostOptionContent
      onClick={() => {
        handleButtonClick(option);
      }}
    >
      <Icon>
        <img src={icon} alt={`icon-${text}`} />
      </Icon>
      <span>{text}</span>
    </NewPostOptionContent>
  );
};
const Input = styled.div`
  position: relative;
  input {
    width: 100%;
  }
  button {
    position: absolute;
    ${fontSize(22)};
    right: 10px;
    top: 10px;
    width: 86.76px;
  }
  display: flex;
  flex-direction: 'column';
`;

const options = [
  { text: 'PHOTO/VIDEO', icon: Images.digii5.Photo, value: 'image' },
  { text: 'BANNER', icon: Images.digii5.Banner, value: 'banner' },
  { text: 'FEELING', icon: Images.digii5.Feeling, value: 'feeling' },
  { text: 'TAG', icon: Images.digii5.Tag, value: 'tag' },
  { text: 'POLL', icon: Images.digii5.Poll, value: 'poll' },
  { text: 'GIF', icon: Images.digii5.GIF, value: 'gif' }
];

class NewPost extends Component {
  constructor() {
    super();
    this.state = {
      isPostButtonVisible: false,
      hasPost: false,
      postText: '',
      type: 'text',
      isBad: false,
      imageObject: null,
      isModalVisible: false,
      alertMessage: null
    };
  }

  componentWillMount() {
    const { onGetPostActivitiesOfAUser, onListPostTypes, user } = this.props;
    onListPostTypes();
    const { isStudent, id } = user.user;
    onGetPostActivitiesOfAUser({ isStudent, id });
  }

  handleButtonClick = option => {
    const { text } = option;
    this.setState({ type: text });
  };

  showPostButton = () => {
    const { user, disableFirstTimePosting, post } = this.props;
    const { posts } = post;
    // console.log(posts);
    const isFirstTimePosting = posts.find(
      item => item.p_actor_id === user.user.id
    );
    console.log('isFirstTimePosting', isFirstTimePosting, user.user);
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
    this.setState({ isPostButtonVisible: true });
  };

  hidePostButton = () => {
    this.setState({ isPostButtonVisible: false });
  };

  handlePostText = e => {
    const { value } = e.target;
    if (value[value.length - 1] === '@') {
      console.log('show users');
    }
    const { postActivity } = this.props;
    if (value.trim().length > 500) {
      this.setState({
        isModalVisible: true,
        alertMessage: 'Please keep the length within 500 characters'
      });
      // alert('Please keep the length within 500 characters');
      this.setState({ postText: value, hasPost: value.trim().length > 0 });
    } else {
      const blacklistedWord = FilterKeyWords(value);
      if (blacklistedWord) {
        const index = postActivity.postActivity.length > 2
          ? 2
          : postActivity.postActivity.length;
        this.setState({
          isModalVisible: true,
          alertMessage: `${warnings[index]}`
        });
        // alert(`${warnings[index]}`);
        this.setState({ isBad: true });
      }
      this.setState({ postText: value, hasPost: value.trim().length > 0 });
    }
  };

  onSaveImage = imageObject => {
    this.setState({ imageObject, hasPost: true });
  };

  onSubmitPost = () => {
    const {
      postText, type, isBad, imageObject
    } = this.state;
    const { postType, user, onPostSubmit } = this.props;
    const { postTypes } = postType;
    const selectedPostType = postTypes.find(
      item => item.pt_title === type.toLowerCase()
    );

    const post = {
      p_pt_id: selectedPostType.pt_id,
      p_body: type === 'text' ? postText : imageObject,
      p_isStudent: user.user.isStudent,
      p_actor_id: user.user.id,
      isBad
    };
    this.setState({ postText: '', isBad: false });

    onPostSubmit(post);
  };

  onChangeHandler = event => {
    // console.log(event.target.files[0]);
    this.setState({ postText: event.target.files[0] });
  };

  postArea = () => {
    const { type, postText } = this.state;
    const { user } = this.props;
    let { firstname } = user.user;
    firstname = firstname.charAt(0).toUpperCase() + firstname.slice(1);
    return (
      <NewPostType
        firstname={firstname}
        postText={postText}
        type={type}
        handlePostText={this.handlePostText}
        showPostButton={this.showPostButton}
        hidePostButton={this.hidePostButton}
        onSaveImage={this.onSaveImage}
      />
    );
  };

  hideModal = () => {
    this.setState({
      isModalVisible: false,
      alertMessage: null
    });
  };

  render() {
    const {
      isPostButtonVisible,
      hasPost,
      isModalVisible,
      alertMessage
    } = this.state;

    const shouldShowPostButton = isPostButtonVisible || hasPost;
    return (
      <NewPostWrapper>
        <NewPostContainer>
          <Input>
            <Avatar src={Images.stockImage} height={53} radius={30} />
            {this.postArea()}
            {/* <TiDelete /> */}
            {shouldShowPostButton && (
              <Button className="rounded" onClick={this.onSubmitPost}>
                POST
              </Button>
            )}
          </Input>
        </NewPostContainer>
        <NewPostOptionContainer>
          {options.map(option => (
            <NewPostOption
              key={option.text}
              option={option}
              handleButtonClick={this.handleButtonClick}
            />
          ))}
        </NewPostOptionContainer>
        {isModalVisible && (
          <Modal message={alertMessage} hideModal={this.hideModal} />
        )}
      </NewPostWrapper>
    );
  }
}

NewPostOption.propTypes = {
  option: PropTypes.object,
  handleButtonClick: PropTypes.func
};
NewPost.propTypes = {
  postType: PropTypes.object,
  user: PropTypes.object,
  onPostSubmit: PropTypes.func,
  disableFirstTimePosting: PropTypes.func,
  onListPostTypes: PropTypes.func,
  onGetPostActivitiesOfAUser: PropTypes.func,
  post: PropTypes.object,
  postActivity: PropTypes.object
};
const mapStateToProps = state => ({
  postType: state.postType,
  user: state.user,
  post: state.post,
  postActivity: state.postActivity
});
const mapDispatchToProps = dispatch => ({
  onPostSubmit: value => dispatch(PostActions.onPostSubmit(value)),
  onListPostTypes: () => dispatch(PostTypeActions.onListPostTypes()),
  disableFirstTimePosting: () => dispatch(LoginActions.onDisableFirstTimePosting()),
  onGetPostActivitiesOfAUser: value => dispatch(PostActivityActions.onGetPostActivitiesOfAUser(value))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewPost);
