import styled from '@emotion/styled';
import { Colors } from '../../Theme';

const ContainerWrapper = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  max-width: 100%;
  background: ${Colors.colors.background};
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
