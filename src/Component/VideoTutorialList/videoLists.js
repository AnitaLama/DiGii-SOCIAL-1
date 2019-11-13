import React, { Component } from 'react';
import { SideBar } from './index';
import {
  VideoListsWrapper,
  VideoCategoryWrapper,
  CategoryTitle,
  CategoryList,
  Thumbnail,
  VideoWrapper,
  VideoTitle,
  ViewMore
} from './style';

class VideoLists extends Component {
  getVideoLists = () => {
    const { categories } = this.props;
    return categories.map(category => (
      <VideoCategoryWrapper>
        <CategoryTitle>
          <span className="title">{category.videoCategoryName}</span>
          <ViewMore>View more</ViewMore>
        </CategoryTitle>
        <CategoryList>
          {category.videoCategoryVideos.map(video => (
            <VideoWrapper>
              <Thumbnail thumbnail={video.thumbnail} />
              <VideoTitle>{video.title}</VideoTitle>
            </VideoWrapper>
          ))}
        </CategoryList>
      </VideoCategoryWrapper>
    ));
  };

  render() {
    return <VideoListsWrapper>{this.getVideoLists()}</VideoListsWrapper>;
  }
}

export default VideoLists;
