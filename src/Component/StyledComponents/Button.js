import styled from '@emotion/styled';
import { Colors } from '../../Theme';

const { pink, peach, snow } = Colors.colors;

const Button = styled.button`
  background-image: linear-gradient(to right, ${pink}, ${peach});
  color: ${snow};
  width: 100%;
  padding: 10px;
  border: 0;
  opacity: 1;
  transition: opacity 1s ease-in-out;
  &.rounded {
    border-radius: 40px !important;
  }
  &:hover {
    opacity: 1;
    background-image: linear-gradient(to right, ${peach}, ${pink});
    color: ${snow};
  }
`;

export { Button };
