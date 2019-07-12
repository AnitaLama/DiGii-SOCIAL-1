import styled from '@emotion/styled';

const ContainerWrapper = styled.div`
  min-height: 100vh;
  max-width: 100%;
`;

const ContentWrapper = styled.div`
  margin: auto;
  width: 1080px;
  @media (max-width: 960px) {
    width: 100%;
    padding: 0 20px;
  }
`;
export { ContainerWrapper, ContentWrapper };
