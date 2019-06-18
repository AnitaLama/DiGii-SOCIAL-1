import styled from '@emotion/styled';
import { Colors, fontSize } from '../../Theme';

const { peach, pencil } = Colors.colors;

const FormInput = styled.input`
  width: 100%;
  border-radius: 40px;
  padding: 10px 15px;
  outline: none;
  border: 1px solid ${pencil};
  color: #495057;
  &::placeholder {
    ${fontSize(14)};
    color: rgba(0, 0, 0, 0.2);
  }
  &:focus {
    box-shadow: 0 0 6px ${peach};
  }
`;

export { FormInput };
