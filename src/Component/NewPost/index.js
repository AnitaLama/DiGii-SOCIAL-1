import styled from '@emotion/styled';
import NewPost from './NewPost';
import ImagePost from './ImagePost';
import NewPostType from './NewPostType';
import GifContainer from './GifPost';
import TextPost from './TextPost';
import { fontSize } from '../../Theme';
import Container from './Container';
import FeelingsPost from './FeelingsPost';
import PhotoVideoPost from './PhotoVideoPost';
import VideoPost from './VideoPost';
import BannerPost from './BannerPost';
import BannerImageModal from './BannerImageEditor';
import TagPost from './TagPost';
import PollPost from './PollPost';

export {
  NewPost,
  ImagePost,
  NewPostType,
  GifContainer,
  TextPost,
  Container,
  FeelingsPost,
  PhotoVideoPost,
  VideoPost,
  BannerPost,
  BannerImageModal,
  TagPost,
  PollPost
};

export const PostWrapper = styled.div`
  padding: 10px 15px;
  display: grid;
  grid-template-columns: auto 86.76px;
  button {
    &.small {
      ${fontSize(22)};
      top: 10px;
      right: 10px;
      width: 86.76px;
    }
  }
  min-height: 150px;
  .redFont {
    color: red;
  }
`;

export const PostWrapperContainer = styled.div`
  padding: 10px 15px;

  button {
    &.small {
      ${fontSize(22)};
      top: 10px;
      right: 10px;
      width: 86.76px;
    }
  }
  min-height: 150px;
`;
