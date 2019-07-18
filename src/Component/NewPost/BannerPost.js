import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import { Colors } from '../../Theme';
import { PostWrapper } from './index';
import BannerActions from '../../Redux/BannerRedux';
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
      username: props.username,
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
    const { banners } = this.props;
    if (banners.banners) {
      return banners.banners.map(item => {
        if (item.Size > 0) {
          const image = `${url}/${item.Key}`;
          return (
            <Image
              key={image}
              src={image}
              onClick={() => {
                this.selectImage(item);
              }}
            />
          );
        }
      });
    }
  };

  render() {
    const { username, showModal, banner } = this.state;

    return (
      <PostWrapper>
        <div>{this.getBanners()}</div>
        {showModal && <ImageModal data={banner} hideModal={this.hideModal} />}
      </PostWrapper>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user,
  banners: state.banner
});
const mapDispatchToProps = dispatch => ({
  onGetAllBanners: () => dispatch(BannerActions.onGetAllBanners())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BannerPost);
