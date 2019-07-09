import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { FormTextArea } from '../StyledComponents';
import { ImagePost, GifContainer } from './index';

const NewPostTypeContainer = styled.div`
  min-height: 150px;
  width: 100%;
`;

class NewPostType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postText: props.postText,
      firstname: props.firstname,
      type: props.type
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        postText: nextProps.postText,
        firstname: nextProps.firstname,
        type: nextProps.type
      });
    }
  }

  getPostArea = () => {
    const { postText, firstname, type } = this.state;
    const {
      showPostButton,
      hidePostButton,
      handlePostText,
      onSaveImage
    } = this.props;
    switch (type) {
      case 'text':
        return (
          <FormTextArea
            placeholder={`What do you want to post, ${firstname}?`}
            style={{ margin: 0 }}
            onFocus={showPostButton}
            onBlur={hidePostButton}
            onChange={handlePostText}
            value={postText}
          />
        );
      case 'PHOTO/VIDEO':
        return <ImagePost onSaveImage={onSaveImage} />;
      case 'TAG':
        return (
          <FormTextArea
            placeholder={`What do you want to post, ${firstname}?`}
            style={{ margin: 0 }}
            onFocus={showPostButton}
            onBlur={hidePostButton}
            onChange={handlePostText}
            value={postText || '@'}
          />
        );
      case 'GIF':
        return <GifContainer />;
      default:
        return (
          <FormTextArea
            placeholder={`What do you want to post, ${firstname}?`}
            style={{ margin: 0 }}
            onFocus={this.showPostButton}
            onBlur={this.hidePostButton}
            onChange={this.handlePostText}
            value={postText}
          />
        );
    }
  };

  render() {
    return <NewPostTypeContainer>{this.getPostArea()}</NewPostTypeContainer>;
  }
}

NewPostType.propTypes = {
  postText: PropTypes.string,
  firstname: PropTypes.string,
  type: PropTypes.string,
  showPostButton: PropTypes.func,
  hidePostButton: PropTypes.func,
  handlePostText: PropTypes.func,
  onSaveImage: PropTypes.func
};
export default NewPostType;
