import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  NewPostWrapper,
  NewPostContainer,
  TaggedMembersChipWrapper,
  TaggedMembersChip,
  TagPostContainer
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

const { onPostSubmit } = PostActions;

class NewPost extends Component {
  state = {
    isImagePost: false,
    isBannerPost: false,
    isFeelingPost: false,
    isTagPost: false,
    isPollPost: false,
    isGifPost: false,
    showPostTypes: false,
    textPost: null,
    feelingPost: null,
    bannerImage: null,
    bannerText: null,
    gifPost: null,
    taggedPost: [],
    taggedUsersArray: []
  };

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
          isImagePost: !isImagePost,
          isBannerPost: false,
          isGifPost: false,
          isPollPost: false,
          isTagPost: false
        });
        break;
      case 'banner':
        this.setState({
          isBannerPost: !isBannerPost,
          isImagePost: false,
          isGifPost: false,
          isPollPost: false,
          isTagPost: false
        });
        break;
      case 'feeling':
        this.setState({
          isFeelingPost: !isFeelingPost,
          isTagPost: false
        });
        break;
      case 'tag':
        this.setState({
          isTagPost: !isTagPost
        });
        break;
      case 'poll':
        this.setState({
          isPollPost: !isPollPost,
          isBannerPost: false,
          isImagePost: false,
          isGifPost: false,
          isFeelingPost: false,
          isTagPost: false
        });
        break;
      case 'gif':
        this.setState({
          isGifPost: !isGifPost,
          isImagePost: false,
          isBannerPost: false,
          isPollPost: false,
          isTagPost: false
        });
        break;
      default:
        break;
    }
  };

  handleTextPostChange = e => {
    const { value } = e.target;
    this.setState({ textPost: value });
  };

  handleImagePostSelect = e => {
    const file = e.target.files;
    console.log('imagepost:::', file);
    // if (file[0].name.toLowerCase() === 'people.jpg') {
    //   this.setState({
    //     imageIsBad: true
    //   });
    // }
    // this.setState({
    //   selectedImage: URL.createObjectURL(file[0]),
    //   showPostButton: true,
    //   fromWebcam: false,
    //   fileName: file[0].name,
    //   file: e.target.files
    // });
    this.setState({
      imagePost: URL.createObjectURL(file[0]),
      gifPost: null,
      bannerPost: null
    });
  };

  deleteSelectedImage = () => {
    this.setState({ imagePost: null });
  };

  handleFeelingPostChange = feeling => {
    const { feelingPost } = this.state;
    if (feelingPost !== feeling) {
      this.setState({ feelingPost: feeling.name, isFeelingPost: false });
    }
  };

  handleBannerPost = banner => {
    const { bannerImage } = this.state;
    if (bannerImage !== banner) {
      this.setState({ bannerImage: banner });
    }
  };

  handleBannerPostText = e => {
    const { value } = e.target;
    this.setState({ bannerText: value });
  };

  handleGifPost = gif => {
    this.setState({ gifPost: gif, imagePost: null });
  };

  deleteSelectedGif = () => {
    this.setState({ gifPost: null });
  };

  handleTagPost = (taggedPost, taggedUsersArray) => {
    this.setState({ taggedPost, taggedUsersArray });
  };

  getTaggedMembersList = () => {
    const { taggedPost } = this.state;
    const newArr = taggedPost.length > 0 && taggedPost.slice(0, 3);
    return (
      newArr
      && newArr.map(user => (
        <TaggedMembersChip key={user.username}>
          <span>
            {' '}
            {user.username}
          </span>
        </TaggedMembersChip>
      ))
    );
  };

  handlePostButtonClick = () => {
    const { onPostSubmit, user } = this.props;
    const { id, isStudent } = user;
    const {
      bannerImage,
      bannerText,
      feelingPost,
      gifPost,
      taggedPost,
      textPost
    } = this.state;
    if (
      bannerImage
      || bannerText
      || feelingPost
      || gifPost
      || taggedPost
      || textPost
    ) {
      const dataToBePosted = {
        postText: textPost,
        postBanner: bannerImage,
        postBannerText: bannerText,
        postFeeling: feelingPost,
        gifPost,
        taggedUsers: taggedPost,
        postActorId: id,
        postIsStudent: isStudent
      };
      console.log('handle post button click', dataToBePosted);
      if (textPost && textPost.length < 250) {
        onPostSubmit(dataToBePosted);
        this.setState({
          textPost: null,
          feelingPost: null,
          bannerImage: null,
          bannerText: null,
          gifPost: null,
          taggedPost: [],
          taggedUsersArray: []
        });
        // onGetStrikesCountOfAUser({ isStudent, id });
      }
      this.setState(this.initialState);
    }
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
    const check = isImagePost
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
          <div>
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
          </div>
          {isFeelingPost && (
            <FeelingsPost
              handleFeelingPostChange={this.handleFeelingPostChange}
            />
          )}
          {isPollPost && <PollPost />}
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
  onPostSubmit: value => dispatch(onPostSubmit(value))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewPost);
