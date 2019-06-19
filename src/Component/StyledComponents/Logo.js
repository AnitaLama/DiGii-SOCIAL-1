import styled from '@emotion/styled';

const BigLogo = styled.img`
  height: 300px;
  @media (max-width: 840px) {
    height: 200px;
  }
  @media (max-width: 720px) {
    height: 200px;
  }
`;
const Logo = styled.img`
  height: 60px;
`;

export { BigLogo, Logo };
