import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import PostActions from '../../Redux/PostRedux';

const Gif = styled.img`
  height: 100px;
  width: 100px;
`;
class Container extends Component {
  selectGif = gif => {
    this.props.selectGif(gif);
    this.props.clearGifList();
  };

  render() {
    const { post } = this.props;
    const { gif } = post;

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
