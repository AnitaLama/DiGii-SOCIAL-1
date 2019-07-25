import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { PostWrapperContainer } from './index';
import BannerActions from '../../Redux/BannerRedux';
import PostActions from '../../Redux/PostRedux';
import { ImageModal } from '../StyledComponents';

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
    const { onGetAllBanners } = this.props;
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
    this.hideModal();
    onSubmitPost(data);
    resetPostType();
  };

  render() {
    const { showModal, banner, postTypeId } = this.state;
    const { user } = this.props;
    return (
      <PostWrapperContainer>
        <div>{this.getBanners()}</div>
        {showModal && (
          <ImageModal
            data={banner}
            hideModal={this.hideModal}
            user={user.user}
            postTypeId={postTypeId}
            onSubmitPost={this.onSubmitPost}
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
  banners: state.banner
});
const mapDispatchToProps = dispatch => ({
  onGetAllBanners: () => dispatch(BannerActions.onGetAllBanners()),
  onSubmitPost: value => dispatch(PostActions.onPostSubmit(value))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BannerPost);
