import React, { Component } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Colors, Images } from '../../Theme';
import { Button } from './index';

const { snow } = Colors.colors;
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
  min-height: 200px;
  margin: auto;
  background: ${snow};
  vertical-align: center;
  border-radius: 40px;
  padding: 20px;
  margin-top: 200px;
  .close {
    cursor: pointer;
    margin-top: -10px;
    color: red;
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
`;
const CloseButton = styled.span``;
const Message = styled.p``;
const ButtonWrapper = styled.div`
  margin: auto;
  text-align: center;
`;

const Points = styled.div`
  margin: auto 0;
  span {
    margin-right: 6px;
  }
`;
class Modal extends Component {
  render() {
    const { message, hideModal } = this.props;
    return (
      <ModalContainer>
        <ModalBox>
          <div className="close">
            <CloseButton onClick={hideModal}>x</CloseButton>
          </div>
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

export default Modal;
