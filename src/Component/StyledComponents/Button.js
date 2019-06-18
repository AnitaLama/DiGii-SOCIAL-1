import styled from '@emotion/styled';
import { Colors } from '../../Theme';

const { pink, peach, snow } = Colors.colors;

const Button = styled.button`
  background-image: linear-gradient(to right, ${pink}, ${peach});
  color: ${snow};
  width: 100%;
  padding: 10px;
  border: 0;
  outline: 0;
  font-weight: 400;
  background-size: 100% 100%;
  transition: all 0.4s ease-in-out;
  &.rounded {
    border-radius: 40px !important;
  }
  &:hover {
    background-image: linear-gradient(to right, ${peach}, ${pink});
    font-weight: 900;
    background-position: 100% 0;
    color: ${snow};
    transition: all 0.4s ease-in-out;
  }
  &:focus {
    outline: 0;
  }
`;

export { Button };
