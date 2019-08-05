import styled from '@emotion/styled';
import {
  Colors,
  fontSize,
  fontWeight,
  boxShadow,
  fontFilson
} from '../../Theme';

const {
  primary, secondary, snow, pen
} = Colors.colors;

const Button = styled.button`
  background-image: ${props => (props.primary && props.secondary
    ? `linear-gradient(to right, ${props.primary}, ${props.secondary})`
    : `linear-gradient(to right, ${primary}, ${secondary})`)};
  color: ${snow};
  width: 100%;
  padding: 10px;
  border: 0;
  outline: 0;
  ${fontWeight('400')};
  ${fontFilson()};
  background-size: 100% 100%;
  transition: all 0.4s ease-in-out;
  &.rounded {
    border-radius: 40px !important;
  }
  &.roundedShadow {
    border-radius: 40px !important;
    ${boxShadow()}
  }
  &:hover {
    background-image: linear-gradient(to right, ${secondary}, ${primary});
    background-image: ${props => (props.secondary && props.primary
    ? `linear-gradient(to right, ${props.secondary}, ${props.primary})`
    : `linear-gradient(to right, ${primary}, ${secondary})`)};
    ${fontWeight('900')}
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
  &.small {
    padding: 0;
  }
`;

const WhiteButton = styled.button`
  background: ${snow};
  border: 2px solid ${snow};
  color: ${pen};
  ${fontSize(15)};
  ${fontFilson()};
  width: 100%;
  padding: 10px;
  outline: 0;
  border: 2px solid ${snow};
  ${fontWeight('400')}
  &.rounded {
    border-radius: 40px !important;
  }
  &.roundedShadow {
    border-radius: 40px !important;
    ${boxShadow()}
  }
  &:hover {
    border: 2px solid ${primary};
    color: ${primary};
  }

  &:focus {
    outline: 0;
  }
`;

export { Button, WhiteButton };
