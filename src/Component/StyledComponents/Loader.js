import React from 'react';
import styled, { keyframes } from 'styled-components';

const bouncedelay = keyframes`
0%, 80%, 100% { transform: scale(0) }
40% { transform: scale(1.0) }
`;
const Spinner = styled.div`
  width: 70px;
  text-align: center;
  div {
    width: 6px;
    height: 6px;
    background-color: #fff;

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
const Loader = () => (
  <Spinner>
    <BallOne />
    <BallTwo />
    <BallThree />
  </Spinner>
);

export default Loader;
