import styled from "@emotion/styled";
import { Colors } from "../../../Theme";

const { blue } = Colors.colors;

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
    content: "";
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
    content: " or drag it here. ";
    display: block;
    margin: 0 auto;
    color: ${blue};
    font-weight: 600;
    text-align: center;
  }
`;
export default ImageInputContainer;
