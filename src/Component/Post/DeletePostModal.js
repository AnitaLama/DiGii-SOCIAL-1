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

class DeletePostModal extends Component {
  getContent = () => {
    const { post, user } = this.props;
    return <ShowFeed post={post} user={user} />;

    // return <div>POST</div>;
  };

  deletePost = () => {
    const { post, user, onDeletePost } = this.props;
    const { isStudent, id } = user;
    onDeletePost({
      postId: post.postId,
      isStudent,
      id
    });
  };

  render() {
    const { closeDeleteModal, user } = this.props;
    const { avatar } = user;
    return (
      <ModalContainer>
        <ModalBox>
          <Header>
            <div>
              <Avatar avatar={avatar} height={60} />
              DiGii
            </div>
          </Header>
          <div>{this.getContent()}</div>

          <ButtonWrapper>
            <Button
              className="rounded short"
              onClick={this.deletePost}
              primary={tint}
              secondary={peach}
            >
              Delete
            </Button>
            {' '}
            <Button className="rounded short" onClick={closeDeleteModal}>
              Cancel
            </Button>
          </ButtonWrapper>
        </ModalBox>
      </ModalContainer>
    );
  }
}

DeletePostModal.propTypes = {
  post: PropTypes.object,
  user: PropTypes.object,
  onDeletePost: PropTypes.func,
  closeDeleteModal: PropTypes.func
};

export default DeletePostModal;
