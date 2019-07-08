import React from 'react';
import styled from '@emotion/styled';
import { absoluteCentering } from '../../Theme';

const ModalContainer = styled.div`
  ${absoluteCentering()};
  // background: rg
`;
const Modal = props => <ModalContainer>{props.message}</ModalContainer>;

export default Modal;
