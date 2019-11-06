import React from 'react';
import styled, { keyframes } from 'styled-components';

const bouncedelay = keyframes`
0%, 80%, 100% { transform: scale(0) }
40% { transform: scale(1.0) }
`;
const Spinner = styled.div`
  width: 70px;
  text-align: center;
  margin: auto;
  div {
    width: ${props => (props && props.size ? `${props.size}px` : '6px')};
    height: ${props => (props && props.size ? `${props.size}px` : '6px')};
    background: ${props => (props && props.color ? `${props.color}` : '#fff')};
    border-radius: 100%;
    display: inline-block;
    animation: ${bouncedelay} 1.4s infinite ease-in-out both;
  }
`;
const BallOne = styled.div`
  -webkit-animation-delay: -0.32s !important;
  animation-delay: -0.32s !important;
`;
const BallTwo = styled.div`
  -webkit-animation-delay: -0.16s !important;
  animation-delay: -0.16s !important;
`;
const BallThree = styled.div``;
const Loader = props => (
  <Spinner {...props}>
    <BallOne />
    <BallTwo />
    <BallThree />
  </Spinner>
);

export default Loader;
