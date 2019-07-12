import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Colors } from '../../Theme';
import { PostWrapper } from './index';
import BannerActions from '../../Redux/BannerRedux';

class BannerPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postTypeId: props.postTypeId,
      username: props.username
    };
  }

  componentWillMount() {
    const { onGetAllBanners } = this.props;
    onGetAllBanners();
  }

  render() {
    const { username } = this.state;

    return (
      <PostWrapper>{`What do you want to post, ${username}?`}</PostWrapper>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user
});
const mapDispatchToProps = dispatch => ({
  onGetAllBanners: () => dispatch(BannerActions.onGetAllBanners())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BannerPost);
