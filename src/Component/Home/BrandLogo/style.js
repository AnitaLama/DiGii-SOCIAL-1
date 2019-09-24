import styled from '@emotion/styled';

const LogoContainer = styled.div`
  position: relative;
`;

const LogoWrapper = styled.div`
  @media (max-width: 720px) {
    margin-top: 30px;
  }
  @media (min-width: 720px) {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
export { LogoWrapper, LogoContainer };
