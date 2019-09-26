import styled from '@emotion/styled';
import { Colors, flexCentering } from '../../../Theme';

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
  ${flexCentering()}
`;
const CenteredElementsModalWrapper = styled.div`
  text-align:center;
  // display: flex;
  //
  // ${flexCentering('column')};
  // justify-content: space-around;
`;
const ModalBox = styled.div`
  width: 45%;
  min-width: 45%;
  min-height: 200px;
  margin: auto;
  background: ${snow};

  vertical-align: center;
  border-radius: 44px;
  box-shadow: 4px 4px 8px #000000;
  padding: 20px;
  .close {
    cursor: pointer;
    margin-top: -10px;
    color: red;
    text-align: right;
  }
  &.centeredModal {
    ${flexCentering()}
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
const Message = styled.div`
  margin: 20px 0;
  text-align: center;
  div {
    text-align: center;
    div {
      margin: 15px 0;
    }
  }
`;
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

const TermsAndConditionBox = styled.div`
  ${flexCentering()};
  input {
    width: auto;
    margin: 0 10px;
  }
  margin: 4px;
  cursor: pointer;
`;

const VideoOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: flex-end;
  padding: 20px;
  cursor: pointer;
  span {
    color: white;
  }
  svg {
    font-size: 65px;
    opacity: 0;
  }
  &:hover {
    svg {
      opacity: 1;
    }
  }
`;

const QuestionOptions = styled.div`
  text-align: center;
  cursor: pointer;
  padding: 6px;
  margin: 6px;
  position: relative;
  svg {
    position: absolute;
    left: 0;
    color: #88cc00;
    font-size: 22px;
  }
`;
const CenteredDiv = styled.div`
  text-align: center;
  .nextButton {
    background: transparent;
    border: 0;
    outline: 0;
  }
`;
export {
  ModalContainer,
  ModalBox,
  Header,
  Icon,
  Points,
  ButtonWrapper,
  Message,
  TermsAndConditionBox,
  CenteredElementsModalWrapper,
  VideoOverlay,
  QuestionOptions,
  CenteredDiv
};
