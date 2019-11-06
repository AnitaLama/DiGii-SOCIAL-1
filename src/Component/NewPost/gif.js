import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import {
  GifPostWrapper,
  GifListContainer,
  GifListItem,
  ImageWrapper
} from './style';
import { FormInput } from '../StyledComponents';
import PostActions from '../../Redux/PostRedux.js';

class GifPost extends Component {
  state = {
    searchGif: null
  };

  handleGifTextChange = e => {
    const { value } = e.target;
    this.setState({ selectedGif: value });
  };

  handleKeyDown = e => {
    if (e.key === 'Enter') {
      this.searchGif();
    }
  };

  searchGif = () => {
    const { onFindGif } = this.props;
    const { selectedGif } = this.state;
    onFindGif(selectedGif);
  };

  handleGifPost = gif => {
    const { handleGifPost } = this.props;
    handleGifPost(gif);
  };

  render() {
    const { gifData, gifPost, deleteSelectedGif } = this.props;
    const { gif, error } = gifData;
    if (gifPost) {
      return (
        <GifPostWrapper>
          <ImageWrapper>
            <img src={gifPost} />
            <span>
              <FaTimes onClick={deleteSelectedGif} />
            </span>
          </ImageWrapper>
        </GifPostWrapper>
      );
    }
    return (
      <GifPostWrapper>
        <FormInput
          placeholder="Search for a GIF..."
          onChange={this.handleGifTextChange}
          onKeyDown={this.handleKeyDown}
        />
        <GifListContainer>
          {gif && gif.length === 0 && <div>{error}</div>}
          {gif
            && gif.map(item => {
              const actualGif = item.images.fixed_height.url;
              return (
                <GifListItem
                  src={actualGif}
                  key={actualGif}
                  onClick={() => {
                    this.handleGifPost(actualGif);
                  }}
                />
              );
            })}
        </GifListContainer>
      </GifPostWrapper>
    );
  }
}

const mapStateToProps = state => ({
  gifData: state.post
});
const mapDispatchToProps = dispatch => ({
  onFindGif: value => dispatch(PostActions.onFindGif(value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GifPost);
