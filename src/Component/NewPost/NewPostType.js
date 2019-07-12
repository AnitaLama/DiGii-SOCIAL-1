import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { connect } from 'react-redux';
import { FormTextArea } from '../StyledComponents';
import PostTypeActions from '../../Redux/PostTypeRedux';
import {
  GifContainer,
  TextPost,
  FeelingsPost,
  PhotoVideoPost,
  BannerPost
} from './index';

const NewPostTypeContainer = styled.div`
  width: 100%;
`;

class NewPostType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: props.type,
      selectedGif: props.selectedGif
    };
  }

  componentWillMount() {
    const { onListPostTypes } = this.props;
    onListPostTypes();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        type: nextProps.type,
        selectedGif: nextProps.selectedGif
      });
    }
  }

  getPostArea = () => {
    const { type, selectedGif } = this.state;
    const { postType, user, resetPostType } = this.props;
    const { postTypes } = postType;
    const { firstname } = user.user;
    let selectedPostType = '';
    selectedPostType = postTypes.length > 0
      && postTypes.find(item => item.pt_title === type.toLowerCase());
    const props = {
      postTypeId: selectedPostType.pt_id,
      username: firstname,
      resetPostType
    };
    switch (type) {
      case 'text':
        return <TextPost {...props} />;
      case 'PHOTO/VIDEO':
        return <PhotoVideoPost {...props} />;
      // return <ImagePost {...props} />;
      case 'TAG':
        return (
          <FormTextArea
            placeholder="What do you want to post?"
            style={{ margin: 0 }}
            {...props}
          />
        );
      case 'GIF':
        return <GifContainer {...props} selectedGif={selectedGif} />;
      case 'FEELING':
        return <FeelingsPost {...props} />;
      case 'BANNER':
        return <BannerPost {...props} />;
      default:
        return <TextPost {...props} />;
    }
  };

  render() {
    return <NewPostTypeContainer>{this.getPostArea()}</NewPostTypeContainer>;
  }
}

NewPostType.propTypes = {
  type: PropTypes.string
};

const mapStateToProps = state => ({
  postType: state.postType,
  user: state.user
});
const mapDispatchToProps = dispatch => ({
  onListPostTypes: () => dispatch(PostTypeActions.onListPostTypes())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewPostType);
