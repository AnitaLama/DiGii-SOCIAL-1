import styled from '@emotion/styled';
import { Colors, fontSize } from '../../Theme';

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
`;

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
`;

const ImageInputContainer = styled.div`
  position: relative;
  background: transparent;
  height: 140px;
  width: 100%;
  input {
    outline: 2px dashed #92b0b3;
    outline-offset: -10px;
    transition: outline-offset 0.15s ease-in-out, background-color 0.15s linear;
    padding: 60px;
    text-align: center !important;
    margin: 0;
    width: inherit !important;
    &:focus {
      outline: 2px dashed #92b0b3;
      outline-offset: -10px;
      transition: outline-offset 0.15s ease-in-out,
        background-color 0.15s linear;
      border: 1px solid #92b0b3;
    }
  }
  &:after {
    pointer-events: one;
    position: absolute;
    top: 20px;
    right: 0;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 50px;
    content: '';
    background-image: url(https://image.flaticon.com/icons/png/128/109/109612.png);
    display: block;
    margin: 0 auto;
    background-size: 50%;
    background-repeat: no-repeat;
  }
  &:before {
    position: absolute;
    bottom: 20px;
    left: 0;
    right: 0;
    height: 32px;
    pointer-events: none;
    width: 100%;
    content: ' or drag it here. ';
    display: block;
    margin: 0 auto;
    color: ${blue};
    font-weight: 600;
    text-align: center;
  }
`;
export { FormInput, FormTextArea, ImageInputContainer };
