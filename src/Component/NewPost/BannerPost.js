import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { PostWrapperContainer, BannerImageModal } from './index';
import BannerActions from '../../Redux/BannerRedux';
import PostActions from '../../Redux/PostRedux';
import { Moderator } from '../Functions';
import LoginActions from '../../Redux/LoginRedux';
import StrikeActions from '../../Redux/StrikeRedux';

const url = 'https://digii-posts.s3-ap-southeast-2.amazonaws.com';

const Image = styled.img`
  height: 80px;
  width: 80px;
  cursor: pointer;
`;
class BannerPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postTypeId: props.postTypeId,
      showModal: false,
      banner: null
    };
  }

  componentWillMount() {
    const { onGetAllBanners, onGetStrikesCountOfAUser, user } = this.props;
    const { isStudent, id } = user.user;
    onGetStrikesCountOfAUser({ isStudent, id });
    onGetAllBanners();
  }

  selectImage = banner => {
    this.setState({ showModal: true, banner });
  };

  hideModal = () => {
    this.setState({ showModal: false });
  };

  getBanners = () => {
    // get all the banners stored in s3
    const { banners } = this.props;
    if (banners.banners) {
      return banners.banners.map((item, i) => {
        if (item.Size > 0) {
          const image = `${url}/${item.Key}`;
          return (
            <Image
              key={`${image}+${i}`}
              src={image}
              onClick={() => {
                this.selectImage(item);
              }}
            />
          );
        }
        return true;
      });
    }
  };

  onSubmitPost = data => {
    const { onSubmitPost, resetPostType } = this.props;
    onSubmitPost(data);
    this.hideModal();
    resetPostType();
  };

  handlePostText = e => {
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

  saveBanner = image => {
    const {
      submitPost,
      strike,
      user,
      onBlockUser,
      postText,
      showWarning,
      resetPostType,
      onGetStrikesCountOfAUser,
      data
      // onSubmitPost
    } = this.props;
    const { postTypeId } = this.state;
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
      const check = showWarning(strikes, isStudent, result);
      console.log(check, result);
      // if (check) {
      //   this.setState({
      //     isModalVisible: check.isModalVisible,
      //     alertMessage: check.alertMessage
      //   });
      // }
      isBad = 1;
    }
    const saveData = {
      postPostTypeId: postTypeId,
      postIsStudent: isStudent,
      postActorId: id,
      postBody: image,
      postText,
      postIsBad: isBad,
      strikeType: result,
      strikeIsStudent: user.user.isStudent,
      strikeActorId: user.user.id,
      isBad
    };
    console.log(saveData);
    // this.onSubmitPost(saveData);
  };

  render() {
    const { showModal, banner, postTypeId } = this.state;
    const { user } = this.props;
    return (
      <PostWrapperContainer>
        <div>{this.getBanners()}</div>
        {showModal && (
          <BannerImageModal
            data={banner}
            hideModal={this.hideModal}
            user={user.user}
            postTypeId={postTypeId}
            onSubmitPost={this.onSubmitPost}
            handlePostText={this.handlePostText}
            postText={this.props.postText}
            saveBanner={this.saveBanner}
            onFocus={this.onFocus}
          />
        )}
      </PostWrapperContainer>
    );
  }
}

BannerPost.propTypes = {
  postTypeId: PropTypes.number,
  banners: PropTypes.object,
  user: PropTypes.object,
  onGetAllBanners: PropTypes.func,
  onSubmitPost: PropTypes.func,
  resetPostType: PropTypes.func
};
const mapStateToProps = state => ({
  user: state.user,
  banners: state.banner,
  post: state.post,
  strike: state.strike
});
const mapDispatchToProps = dispatch => ({
  onGetAllBanners: () => dispatch(BannerActions.onGetAllBanners()),
  onSubmitPost: value => dispatch(PostActions.onPostSubmit(value)),
  onGetStrikesCountOfAUser: value => dispatch(StrikeActions.onGetStrikesCountOfAUser(value)),
  disableFirstTimePosting: () => dispatch(LoginActions.onDisableFirstTimePosting()),
  onBlockUser: value => dispatch(LoginActions.onBlockUser(value))
});
export default Moderator(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(BannerPost)
);
