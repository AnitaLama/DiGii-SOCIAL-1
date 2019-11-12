import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  NewPostWrapper,
  NewPostContainer,
  TaggedMembersChipWrapper,
  TaggedMembersChip
} from './style';
import PostTypes from './postTypes';
import TextPost from './textPost';
import ImagePost from './image';
import BannerPost from './banner';
import GifPost from './gif';
import FeelingsPost from './feeling';
import PollPost from './poll';
import TagPost from './tag';
import PostActions from '../../Redux/PostRedux.js';
import StrikeActions from '../../Redux/StrikeRedux.js';
import { Avatar } from '../StyledComponents';

const url = 'https://digii-posts.s3-ap-southeast-2.amazonaws.com';

const { onPostSubmit, onUploadImage } = PostActions;
const { onGetStrikesCountOfAUser } = StrikeActions;
const pollOption = [
  {
    id: Math.random(0, 1).toFixed(3),
    text: '',
    img: ''
  },
  {
    id: Math.random(0, 1).toFixed(3),
    text: '',
    img: ''
  },
  {
    id: Math.random(0, 1).toFixed(3),
    text: '',
    img: ''
  }
];
const postVisibilityState = {
  isImagePost: false,
  isBannerPost: false,
  isFeelingPost: false,
  isTagPost: false,
  isPollPost: false,
  isGifPost: false,
  showPostTypes: false
};
const postValues = {
  bannerImage: null,
  bannerText: null,
  gifPost: null,
  pollQuestion: null,
  imagePost: null
};
class NewPost extends Component {
  state = {
    ...postVisibilityState,
    ...postValues,
    postText: null,
    feelingPost: null,
    taggedPost: [],
    taggedUsersArray: [],
    options: [...pollOption]
  };

  componentDidMount() {
    const { user, onGetStrikesCountOfAUser } = this.props;
    const { isStudent, id } = user;
    onGetStrikesCountOfAUser({ isStudent, id });
  }

  handleNewPostFocus = () => {
    this.setState({ showPostTypes: true });
  };

  handleNewPostBlur = () => {
    this.setState({ showPostTypes: false });
  };

  handleNewPostClick = () => {
    this.setState({ focusTextDiv: true });
  };

  handlePostTypeOptionClick = option => {
    const {
      isImagePost,
      isBannerPost,
      isFeelingPost,
      isTagPost,
      isPollPost,
      isGifPost
    } = this.state;
    switch (option.value) {
      case 'image':
        this.setState({
          ...postVisibilityState,
          isImagePost: !isImagePost
        });
        break;
      case 'banner':
        this.setState({
          ...postVisibilityState,
          isBannerPost: !isBannerPost
        });
        break;
      case 'feeling':
        this.setState({
          ...postVisibilityState,
          isFeelingPost: !isFeelingPost
        });
        break;
      case 'tag':
        this.setState({
          ...postVisibilityState,
          isTagPost: !isTagPost
        });
        break;
      case 'poll':
        this.setState({
          ...postVisibilityState,
          isPollPost: !isPollPost
        });
        break;
      case 'gif':
        this.setState({
          ...postVisibilityState,
          isGifPost: !isGifPost
        });
        break;
      default:
        break;
    }
  };

  handleTextPostChange = e => {
    const { value } = e.target;
    this.setState({ postText: value });
  };

  handleImagePostSelect = e => {
    const file = e.target.files;

    this.setState({
      ...postValues,
      imagePost: URL.createObjectURL(file[0]),
      file,
      options: [...pollOption]
    });
  };

  deleteSelectedImage = () => {
    this.setState({ imagePost: null });
  };

  handleFeelingPostChange = feeling => {
    const { feelingPost } = this.state;
    if (feelingPost !== feeling) {
      this.setState({ feelingPost: feeling.name });
    }
  };

  handleBannerPost = banner => {
    const { bannerImage, bannerText } = this.state;
    if (bannerImage !== banner) {
      this.setState({
        ...postValues,
        bannerImage: banner,
        bannerText,
        options: [...pollOption]
      });
    }
  };

  handleBannerPostText = e => {
    const { value } = e.target;
    const { bannerImage } = this.state;

    this.setState({
      ...postValues,
      bannerImage,
      bannerText: value,
      options: [...pollOption]
    });
  };

  handleGifPost = gif => {
    this.setState({
      ...postValues,
      gifPost: gif,
      options: [...pollOption]
    });
  };

  deleteSelectedGif = () => {
    this.setState({ gifPost: null });
  };

  handleTagPost = taggedPost => {
    this.setState({ taggedPost });
  };

  getTaggedMembersList = () => {
    const { taggedPost } = this.state;
    const newArr = taggedPost.length > 0 && taggedPost.slice(0, 3);
    return (
      newArr
      && newArr.map(user => (
        <TaggedMembersChip key={user.username}>
          <Avatar avatar={user.avatar} height={20} />
          <span> 
{' '}
{user.username}
</span>
        </TaggedMembersChip>
      ))
    );
  };

  handlePostButtonClick = () => {
    const { onPostSubmit, user, onUploadImage } = this.props;
    const { id, isStudent } = user;
    const {
      bannerImage,
      bannerText,
      feelingPost,
      gifPost,
      taggedPost,
      postText,
      file,
      imagePost,
      pollQuestion,
      options
    } = this.state;

    if (
      bannerImage
      || bannerText
      || feelingPost
      || gifPost
      || taggedPost.length > 0
      || postText
      || imagePost
      || pollQuestion
    ) {
      const dataToBePosted = {
        postText: postText && postText.slice(0, 250),
        postBanner: bannerImage,
        postBannerText: bannerText && bannerText.slice(0, 250),
        postFeeling: feelingPost,
        postGif: gifPost,
        taggedUsers: taggedPost,
        postActorId: id,
        postIsStudent: isStudent,
        question: pollQuestion && pollQuestion.slice(0, 250),
        options
      };
      if (postText && postText.length > 0 && postText.length < 250) {
        onPostSubmit(dataToBePosted);
        this.resetPostType();
      } else if (
        pollQuestion
        && pollQuestion.length > 0
        && pollQuestion.length < 250
      ) {
        const pollOptions = options.filter(item => item.img || item.text);
        console.log('POLL', pollQuestion, options);
        pollOptions.map(item => {
          const formData = new FormData();
          if (item.img) {
            formData.append('file', item.img);
            formData.append('name', item.name);
            onUploadImage(formData);
          }
          return true;
        });
        onPostSubmit({ ...dataToBePosted, options: pollOptions });
        this.resetPostType();
      } else if (
        imagePost
        || bannerImage
        || bannerText
        || feelingPost
        || gifPost
        || taggedPost
      ) {
        if (imagePost) {
          const formData = new FormData();
          formData.append('file', file[0]);
          formData.append('isImage', 1);
          formData.append('fileProps', JSON.stringify(dataToBePosted));
          onPostSubmit(formData);
          this.resetPostType();
        } else {
          onPostSubmit(dataToBePosted);
        }
      }
    }
  };

  resetPostType = () => {
    this.setState({
      ...postValues,
      ...postVisibilityState,
      postText: null,
      feelingPost: null,
      taggedPost: [],
      taggedUsersArray: [],
      options: [...pollOption]
    });
  };

  handleOptionChange = (e, option) => {
    const { options, pollQuestion } = this.state;
    const { value } = e.target;
    const newArr = [];
    options.forEach(item => {
      if (item.id !== option.id) {
        newArr.push(item);
      } else {
        newArr.push({ ...option, text: value });
      }
    });
    this.setState({ options: newArr, ...postValues, pollQuestion });
  };

  selectImage = (e, option) => {
    const { options } = this.state;
    const newArr = [];

    let fileName = e.target.files[0].name.replace(/\s/g, '-');
    // SAVE NAME ALONG WITH CURRENT TIME FOR UNIQUE NAME
    const currentDate = new Date();
    fileName = currentDate.getTime() + fileName;
    options.forEach(item => (option.id === item.id
        ? newArr.push({
            ...item,
            img: e.target.files[0],
            fileName: URL.createObjectURL(e.target.files[0]),
            name: `${url}/${fileName}`,
            url: `${url}/${URL.createObjectURL(e.target.files[0])}`
          })
        : newArr.push(item)));
    this.setState({ options: newArr, ...postValues });
  };

  openFileSystem = id => {
    document.getElementById(id).click();
  };

  addNewOption = () => {
    const { options } = this.state;
    const optionLength = options.length;
    // MAXIMUM 20 OPTIONS ONLY
    if (optionLength < 20) {
      this.setState(prevState => ({
        options: [
          ...prevState.options,
          {
            id: Math.random(0, 100).toFixed(3),
            text: '',
            img: '',
            name: ''
          }
        ]
      }));
    }
  };

  removeOption = option => {
    // REMOVE THE PARTICULAR OPTION FROM THE LIST
    const { options } = this.state;
    const tempArr = options;
    const newArr = [];
    tempArr.forEach(item => {
      if (item.id !== option.id) {
        newArr.push(item);
      }
    });
    this.setState({ options: newArr });
  };

  handleQuestionChange = e => {
    const { value } = e.target;
    console.log('poll question change', value);
    this.setState({ ...postValues, pollQuestion: value });
  };

  render() {
    const {
      showPostTypes,
      isImagePost,
      isBannerPost,
      isFeelingPost,
      isPollPost,
      isGifPost,
      isTagPost,
      taggedPost
    } = this.state;
    const check =      isImagePost
      || isBannerPost
      || isFeelingPost
      || isPollPost
      || isGifPost
      || isTagPost;
    const props = { ...this.state };
    return (
      <NewPostWrapper
        tabIndex="-1"
        onFocus={this.handleNewPostFocus}
        onBlur={this.handleNewPostBlur}
      >
        <NewPostContainer>
          <TextPost
            handleTextPostChange={this.handleTextPostChange}
            handlePostButtonClick={this.handlePostButtonClick}
            {...props}
          />
          <TaggedMembersChipWrapper className="clearfix">
            {this.getTaggedMembersList()}
            {taggedPost && taggedPost.length > 3 && (
              <TaggedMembersChip>
+
{taggedPost.length - 3}
</TaggedMembersChip>
            )}
            {isTagPost && (
              <TagPost handleTagPost={this.handleTagPost} {...props} />
            )}
          </TaggedMembersChipWrapper>
          {isFeelingPost && (
            <FeelingsPost
              handleFeelingPostChange={this.handleFeelingPostChange}
              {...props}
            />
          )}
          {isPollPost && (
            <PollPost
              handleOptionChange={this.handleOptionChange}
              selectImage={this.selectImage}
              openFileSystem={this.openFileSystem}
              addNewOption={this.addNewOption}
              removeOption={this.removeOption}
              handleQuestionChange={this.handleQuestionChange}
              {...props}
            />
          )}
          {isGifPost && (
            <GifPost
              handleGifPost={this.handleGifPost}
              deleteSelectedGif={this.deleteSelectedGif}
              {...props}
            />
          )}
          {isImagePost && (
            <ImagePost
              handleImagePostSelect={this.handleImagePostSelect}
              deleteSelectedImage={this.deleteSelectedImage}
              {...props}
            />
          )}
          {isBannerPost && (
            <BannerPost
              handleBannerPost={this.handleBannerPost}
              handleBannerPostText={this.handleBannerPostText}
              {...props}
            />
          )}
        </NewPostContainer>
        {(showPostTypes || check) && (
          <PostTypes
            handlePostTypeOptionClick={this.handlePostTypeOptionClick}
          />
        )}
      </NewPostWrapper>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user.user
});
const mapDispatchToProps = dispatch => ({
  onPostSubmit: value => dispatch(onPostSubmit(value)),
  onUploadImage: value => dispatch(onUploadImage(value)),
  // poll functions
  onGetStrikesCountOfAUser: value => dispatch(onGetStrikesCountOfAUser(value))
});
export default connect(mapStateToProps, mapDispatchToProps)(NewPost);
