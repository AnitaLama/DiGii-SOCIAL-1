import React, { Component } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Colors, Images } from '../../Theme';
import { Button, Avatar } from './index';
import { ShowFeed } from '../Functions';

const { snow, tint, peach } = Colors.colors;
const ModalContainer = styled.div`
  position: fixed;
  background: rgba(0, 0, 0, 0.32);
  height: 100%;
  width: 100%;
  z-index: 10000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
const ModalBox = styled.div`
  width: 50%;
  min-width: 50%;
  min-height: 200px;
  margin: auto;
  background: ${snow};

  vertical-align: center;
  border-radius: 40px;
  padding: 20px;
  .close {
    cursor: pointer;
    margin-top: -10px;
    color: red;
    text-align: right;
  }
`;

const Icon = styled.img`
  height: 60px;
  &.small {
    height: 30px;
  }
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  div:first-of-type {
    display: flex;
    align-items: center;
  }
`;
const Message = styled.p``;
const ButtonWrapper = styled.div`
  margin: auto;
  text-align: center;
  button {
    width: 30% !important;
  }
  display: flex;
  justify-content: space-around;
`;

const Points = styled.div`
  margin: auto 0;
  span {
    margin-right: 6px;
  }
`;

class Modal extends Component {
  constructor() {
    super();
    this.state = {
      text: ''
    };
  }

  render() {
    const { message, hideModal } = this.props;
    return (
      <ModalContainer>
        <ModalBox
          style={{
            marginTop: '200px'
          }}
        >
          {/*  <div className="close">
            <CloseButton onClick={hideModal}>x</CloseButton>
          </div> */}
          <Header>
            <div>
              <Icon src={Images.digii5.icon} />
              Digii
            </div>
            <Points>
              <span>-5</span>
              <Icon src={Images.digii5.DiGiitIconColored} className="small" />
            </Points>
          </Header>

          <Message>{message}</Message>

          <ButtonWrapper>
            <Button className="rounded short" onClick={hideModal}>
              OK
            </Button>
          </ButtonWrapper>
        </ModalBox>
      </ModalContainer>
    );
  }
}

Modal.propTypes = {
  message: PropTypes.string,
  hideModal: PropTypes.func
};

class DeleteModal extends Component {
  constructor() {
    super();
    this.state = {
      text: ''
    };
  }

  getContent = () => {
    const { post, user } = this.props;
    return <ShowFeed post={post} user={user} />;

    // return <div>POST</div>;
  };

  deletePost = () => {
    const { post, user, onDeletePost } = this.props;
    const { isStudent, id } = user;
    onDeletePost({
      p_id: post.p_id,
      isStudent,
      id
    });
  };

  render() {
    const { closeDeleteModal, user } = this.props;
    const { avatar } = user;
    return (
      <ModalContainer>
        <ModalBox
          style={{
            marginTop: '200px'
          }}
        >
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

DeleteModal.propTypes = {
  message: PropTypes.string,
  hideDeleteModal: PropTypes.func
};

class EditModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.post && props.post.p_text
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
    const { post, user, onEditPost } = this.props;
    const data = {
      p_text: text,
      p_id: post.p_id
    };
    onEditPost(data);
  };

  handlePostChange = value => {
    this.setState({ text: value });
  };

  render() {
    const { post, closeEditModal, user } = this.props;
    const { avatar } = user;
    return (
      <ModalContainer>
        <ModalBox
          style={{
            marginTop: '200px'
          }}
        >
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
  message: PropTypes.string,
  hideDeleteModal: PropTypes.func
};

export {
  Modal,
  ModalContainer,
  ModalBox,
  Header,
  Icon,
  Points,
  ButtonWrapper,
  DeleteModal,
  EditModal
};
