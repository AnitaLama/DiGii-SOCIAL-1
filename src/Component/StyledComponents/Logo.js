import styled from '@emotion/styled';

const BigLogo = styled.img`
  height: ${props => `${props.height}px` || '300px'};
  @media (max-width: 840px) {
    height: 150px;
  }
  @media (max-width: 720px) {
    height: 150px;
  }
`;
const Logo = styled.img`
  height: 60px;
`;

export { BigLogo, Logo };
