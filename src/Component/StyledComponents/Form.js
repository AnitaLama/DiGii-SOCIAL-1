import styled from '@emotion/styled';
import { Colors, fontSize } from '../../Theme';

const { pink, peach, snow } = Colors.colors;

const FormInput = styled.input`
  width: 100%;
  border-radius: 40px;
  padding: 10px 15px;
  outline: none;
  border: 1px solid #ced4da;
  color: #495057;
  &::placeholderfocus {
    ${fontSize(14)};
    color: rgba(0, 0, 0, 0.2);
  }
  &:focus {
    box-shadow: 0 0 6px ${peach};
  }
`;

export { FormInput };
