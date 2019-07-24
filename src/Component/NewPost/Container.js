import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import PostActions from '../../Redux/PostRedux';

const Gif = styled.img`
  height: 100px;
  width: 100px;
`;
class Container extends Component {
  selectGif = gif => {
    const { selectGif, clearGifList } = this.props;
    selectGif(gif);
    clearGifList();
  };

  render() {
    const { post } = this.props;
    const { gif } = post;
    // DISPLAY ALL THE GIFS IN THE STORE
    return (
      <div>
        {gif
          && gif.map((item, i) => (
            <Gif
              key={`${item}+${i}`}
              src={item.images.downsized_medium.url}
              onClick={() => {
                this.selectGif(item);
              }}
            />
          ))}
      </div>
    );
  }
}
Container.propTypes = {
  post: PropTypes.object,
  clearGifList: PropTypes.func,
  selectGif: PropTypes.func
};
const mapStateToProps = state => ({
  post: state.post
});
const mapDispatchToProps = dispatch => ({
  clearGifList: () => dispatch(PostActions.clearGifList())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
