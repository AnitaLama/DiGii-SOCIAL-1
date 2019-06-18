import styled from '@emotion/styled';

const ContainerWrapper = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  max-width: 100%;
`;

const ContentWrapper = styled.div`
  margin: auto;
  width: 960px;
  @media (max-width: 960px) {
    width: 100%;
  }
`;
export { ContainerWrapper, ContentWrapper };
