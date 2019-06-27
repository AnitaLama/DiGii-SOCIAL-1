import styled from '@emotion/styled';
import { Colors } from '../../Theme';

const {
  primary, secondary, snow, pen
} = Colors.colors;

const Button = styled.button`
  background-image: linear-gradient(to right, ${primary}, ${secondary});
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
    background-image: linear-gradient(to right, ${secondary}, ${primary});
    font-weight: 900;
    background-position: 100% 0;
    color: ${snow};
    transition: all 0.4s ease-in-out;
  }
  &:focus {
    outline: 0;
  }
  &.short {
    width: 50%;
  }
`;

const WhiteButton = styled.button`
  background: ${snow};
  border: 2px solid ${snow};
  color: ${pen};
  width: 100%;
  padding: 10px;
  border: 0;
  outline: 0;
  font-weight: 400;
  &.shadowed {
    box-shadow: 5px 5px 10px -1px rgba(0, 0, 0, 0.25);
  }
  &.rounded {
    border-radius: 40px !important;
  }
  &:hover {
    border: 2px solid ${primary};
    color: ${primary};
    font-weight: 900;
  }

  &:focus {
    outline: 0;
  }
`;

export { Button, WhiteButton };
