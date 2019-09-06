import styled from '@emotion/styled';
import { Colors, fontSize } from '../../../Theme';

const { secondary, pencil, blue } = Colors.colors;

const FormTextArea = styled.textarea`
  width: 100%;
  border-radius: 10px;
  outline: none;
  border: 0;
  outline:0
  color: #495057;
  margin-bottom: 10px;
  background:transparent;
  resize:none;
  &::placeholder {
    ${fontSize(14)};
    color: rgba(0, 0, 0, 0.2);
  }
  cursor:pointer;
`;

export default FormTextArea;
