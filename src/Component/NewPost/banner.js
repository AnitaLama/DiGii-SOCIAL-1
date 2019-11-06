import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  BannerPostWrapper,
  BannerOption,
  BannerOptionContainer,
  BannerInput
} from './style';

const url = 'https://digii-posts.s3-ap-southeast-2.amazonaws.com';

class BannerPost extends Component {
  state = {
    selectedBanner: null,
    bannerText: null
  };

  componentWillMount() {
    const { bannerPost, bannerText } = this.props;
    this.setState({ selectedBanner: bannerPost, bannerText });
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
    const { banner, handleBannerPost } = this.props;
    const { selectedBanner, bannerText } = this.state;
    console.log('selectedBanner', selectedBanner);
    return (
      <BannerPostWrapper background={selectedBanner}>
        <BannerInput
          ref={r => (this.bannerPost = r)}
          onChange={this.handleBannerPostText}
          value={bannerText || ''}
        />

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
export default connect(mapStateToProps)(BannerPost);
