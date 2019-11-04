import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  BannerPostWrapper,
  BannerOption,
  BannerOptionContainer
} from './style';

const url = 'https://digii-posts.s3-ap-southeast-2.amazonaws.com';

class BannerPost extends Component {
  state = {
    selectedBanner: null
  };

  selectBanner = banner => {
    this.setState({ selectedBanner: `${url}/${banner}` });
  };

  render() {
    const { banner } = this.props;
    const { selectedBanner } = this.state;
    console.log('selectedBanner', selectedBanner);
    return (
      <BannerPostWrapper background={selectedBanner}>
        <BannerOptionContainer>
          {banner.map(item => {
            if (item.Size > 0) {
              return (
                <BannerOption
                  onClick={() => {
                    this.selectBanner(item.Key);
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
