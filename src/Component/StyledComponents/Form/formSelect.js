import styled from '@emotion/styled';
import { Colors, fontSize } from '../../../Theme';

const { secondary, pencil, blue } = Colors.colors;

const FormSelect = styled.select`
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
  background: #e8f0fe;

  option {
    background: #e8f0fe;
    border: 0;
    outline: 0;
    height: 20px;
    &:hover {
      background: ${blue};
    }
  }
`;

export default FormSelect;
