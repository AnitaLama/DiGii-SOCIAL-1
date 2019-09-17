import styled from '@emotion/styled';
import { grid, flexCentering } from '../../../Theme';

const PhotoOptionContainer = styled.div`
  height: 100%;
`;
const ImageWrapper = styled.div`
  display: flex;
  img {
    height: 100px;
  }
`;
const PhotoOptionContent = styled.div`
  ${grid(2, '1fr')};
  height: 100%;
  align-items: center;
`;

const PhotoVideoPostWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  min-height: 120px;
  div {
    width: 90%;
  }
`;

const VideoPostWrapper = styled.div`
  ${flexCentering()};
  height: 100%;
`;
const VideoDisplayWrapper = styled.div`
  display: flex;
`;
export {
  PhotoOptionContainer,
  ImageWrapper,
  PhotoOptionContent,
  PhotoVideoPostWrapper,
  VideoPostWrapper,
  VideoDisplayWrapper
};
