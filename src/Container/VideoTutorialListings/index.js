import React from 'react';
import { VideoTutorialListingsComponent } from '../../Component/VideoTutorialList';
import {
  ContainerWrapper,
  ContentWrapper
} from '../../Component/StyledComponents';
import { Header } from '../../Component/Header';

const VideoTutorialListings = () => (
  <ContainerWrapper>
    <Header />
    <ContentWrapper>
      <VideoTutorialListingsComponent />
    </ContentWrapper>
  </ContainerWrapper>
);

export default VideoTutorialListings;
