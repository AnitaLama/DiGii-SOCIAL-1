import styled from '@emotion/styled';
import { Colors, fontSize } from '../../../Theme';

const { secondary, pencil, blue } = Colors.colors;

const FormInput = styled.input`
  width: 100%;
  border-radius: 40px;
  padding: 10px 20px;
  outline: none;
  border: 1px solid ${pencil};
  color: #495057;
  margin-bottom: 10px;
  &::placeholder {
    ${fontSize(14)};
    color: rgba(0, 0, 0, 0.2);
  }
  &:focus {
    box-shadow: 0 0 6px ${secondary};
  }
  cursor: pointer;
`;

export default FormInput;
