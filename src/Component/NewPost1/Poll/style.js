import styled from '@emotion/styled';
import { flexCentering, fontSize } from '../../../Theme';

const SingleOption = styled.div`
  ${flexCentering()};
  padding: 2px 0;
  input {
    border: 0;
    outline: none;
    margin-left: 6px;
    &::placeholder {
      font-family: Lato;
    }
  }
`;
const ImageIcon = styled.div`
  input {
    display: none;
  }
  color: #d5d4d4;
  svg {
    height: 20.73px;
  }
`;
const QuestionWrapper = styled.div`
  input {
    border: 0;
    outline: 0;
    &:focus {
      border: 0;
    }
  }
`;
const PollOptionsWrapper = styled.div`
  padding: 10px 15px;
`;
const CloseButton = styled.span`
  cursor: pointer;
  color: #d5d4d4;
`;
const AddButton = styled.span`
  cursor: pointer;
  color: #61bbf7;
  ${fontSize(14)}
`;

export {
  SingleOption,
  ImageIcon,
  QuestionWrapper,
  PollOptionsWrapper,
  CloseButton,
  AddButton
};
