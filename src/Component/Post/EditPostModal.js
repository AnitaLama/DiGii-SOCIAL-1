import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ModalContainer,
  ModalBox,
  Header,
  ButtonWrapper,
  Button,
  Avatar
} from '../StyledComponents';
import { Colors } from '../../Theme';
import { ShowFeed } from '../Functions';

const { tint, peach } = Colors.colors;

class EditModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.post && props.post.postText
    };
  }

  getContent = () => {
    const { user, post } = this.props;
    return (
      <ShowFeed
        post={{ ...post, edit: true }}
        user={user}
        handlePostChange={this.handlePostChange}
      />
    );
    // return <div>POST</div>;
  };

  onEditPost = () => {
    const { text } = this.state;
    const { post, onEditPost } = this.props;
    const data = {
      postText: text,
      postId: post.postId
    };
    onEditPost(data);
  };

  handlePostChange = value => {
    this.setState({ text: value });
  };

  render() {
    const { closeEditModal, user } = this.props;
    const { avatar } = user;
    return (
      <ModalContainer>
        <ModalBox>
          <Header>
            <div>
              <Avatar avatar={avatar} height={60} />
              Digii
            </div>
          </Header>
          <div>{this.getContent()}</div>

          <ButtonWrapper>
            <Button
              className="rounded short"
              primary={tint}
              secondary={peach}
              onClick={this.onEditPost}
            >
              Edit
            </Button>
            {' '}
            <Button className="rounded short" onClick={closeEditModal}>
              Cancel
            </Button>
          </ButtonWrapper>
        </ModalBox>
      </ModalContainer>
    );
  }
}

EditModal.propTypes = {
  post: PropTypes.object,
  user: PropTypes.object,
  onEditPost: PropTypes.func,
  closeEditModal: PropTypes.func
};

export default EditModal;
