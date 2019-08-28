import styled from '@emotion/styled';

const BigLogo = styled.img`
  height: ${props => `${props.height}px` || '300px'};
  @media (max-width: 840px) {
    height: 150px;
  }
  @media (max-width: 720px) {
    height: 150px;
  }
  cursor: pointer;
`;
const Logo = styled.img`
  height: 60px;
  cursor: pointer;
`;

export { BigLogo, Logo };
