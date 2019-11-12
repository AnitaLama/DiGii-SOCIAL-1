import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  BannerPostWrapper,
  BannerOption,
  BannerOptionContainer,
  BannerInput
} from './style';
import BannerActions from '../../Redux/BannerRedux.js';
import { TextAreaBox } from '../Functions';

const { onGetAllBanners } = BannerActions;

const url = 'https://digii-posts.s3-ap-southeast-2.amazonaws.com';

class BannerPost extends Component {
  state = {
    selectedBanner: null,
    bannerText: null
  };

  componentWillMount() {
    const { bannerPost, bannerText, onGetAllBanners } = this.props;
    onGetAllBanners();
    this.setState({ selectedBanner: bannerPost, bannerText });
  }

  componentDidUpdate(prevProps) {
    console.log('>>>>>>>>>>>>>.', prevProps, this.props);
    // if(prevProps.)
  }

  selectBanner = banner => {
    this.setState({ selectedBanner: banner });
  };

  handleBannerPostText = e => {
    const { value } = e.target;
    const { handleBannerPostText } = this.props;
    this.setState({ bannerText: value });
    handleBannerPostText(e);
  };

  render() {
    const {
      banner,
      handleBannerPost,
      bannerImage,
      bannerText,
      bannerPost
    } = this.props;
    // const { selectedBanner, bannerText } = this.state;
    // console.log('selectedBanner', selectedBanner);
    return (
      <BannerPostWrapper background={bannerImage}>
        <BannerInput>
          <TextAreaBox
            className="textBox"
            ref={r => (this.bannerPost = r)}
            onChange={this.handleBannerPostText}
            value={bannerText || ''}
          />
        </BannerInput>
        <BannerOptionContainer>
          {banner.map(item => {
            if (item.Size > 0) {
              return (
                <BannerOption
                  onClick={() => {
                    this.selectBanner(`${url}/${item.Key}`);
                    handleBannerPost(`${url}/${item.Key}`);
                  }}
                  key={item.Key}
                >
                  <img src={`${url}/${item.Key}`} />
                </BannerOption>
              );
            }
          })}
        </BannerOptionContainer>
      </BannerPostWrapper>
    );
  }
}
const mapStateToProps = state => ({
  banner: state.banner.banners
});
const mapDispatchToProps = dispatch => ({
  onGetAllBanners: () => dispatch(onGetAllBanners())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BannerPost);
