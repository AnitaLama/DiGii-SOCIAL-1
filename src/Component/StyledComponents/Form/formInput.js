import styled from '@emotion/styled';
import { Colors, fontSize } from '../../../Theme';

const { secondary, pencil } = Colors.colors;

const FormInput = styled.input`
  width: 100%;
  border-radius: 40px;
  padding: 10px 20px;
  height: 36px;
  outline: none;
  border: 0;
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
  &.textBox {
    &:focus {
      box-shadow: none;
    }
    padding: 0;
    height: auto;
    border: 0;
    margin-bottom: 0;
    border-radius: 10px;
  }
`;

export default FormInput;
