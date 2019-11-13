import React, { Component } from 'react';
import { Header, VideoLists, SideBar } from './index';
import { VideoTutorialHomeWrapper, VideoTutorialHomeContainer } from './style';

const categories = [
  {
    videoCategoryName: 'Category1',
    videoCategoryVideos: [
      {
        url: 'https://www.youtube.com/watch?v=lWgvuOuZHfg',
        thumbnail:
          'https://media.socastsrm.com/wordpress/wp-content/blogs.dir/192/files/2018/11/winter2.jpg',
        title: 'Category1 Video'
      },
      {
        url: 'https://www.youtube.com/watch?v=lWgvuOuZHfg',
        thumbnail:
          'https://media.socastsrm.com/wordpress/wp-content/blogs.dir/192/files/2018/11/winter2.jpg',
        title: 'Category1 Video'
      },
      {
        url: 'https://www.youtube.com/watch?v=lWgvuOuZHfg',
        thumbnail:
          'https://media.socastsrm.com/wordpress/wp-content/blogs.dir/192/files/2018/11/winter2.jpg',
        title: 'Category1 Video'
      },
      {
        url: 'https://www.youtube.com/watch?v=lWgvuOuZHfg',
        thumbnail:
          'https://media.socastsrm.com/wordpress/wp-content/blogs.dir/192/files/2018/11/winter2.jpg',
        title: 'Category1 Video'
      },
      {
        url: 'https://www.youtube.com/watch?v=lWgvuOuZHfg',
        thumbnail:
          'https://media.socastsrm.com/wordpress/wp-content/blogs.dir/192/files/2018/11/winter2.jpg',
        title: 'Category1 Video'
      },
      {
        url: 'https://www.youtube.com/watch?v=lWgvuOuZHfg',
        thumbnail:
          'https://media.socastsrm.com/wordpress/wp-content/blogs.dir/192/files/2018/11/winter2.jpg',
        title: 'Category1 Video'
      }
    ]
  },
  {
    videoCategoryName: 'Category2',
    videoCategoryVideos: [
      {
        url: 'https://www.youtube.com/watch?v=wqeJ5Vkb6JE',
        thumbnail:
          'https://i2.wp.com/www.art-mine.com/collectorscorner/wp-content/uploads/2018/06/Tempting-Destiny.jpeg?resize=1200%2C820',
        title: 'Category2 Video'
      },
      {
        url: 'https://www.youtube.com/watch?v=wqeJ5Vkb6JE',
        thumbnail:
          'https://i2.wp.com/www.art-mine.com/collectorscorner/wp-content/uploads/2018/06/Tempting-Destiny.jpeg?resize=1200%2C820',
        title: 'Category2 Video'
      },
      {
        url: 'https://www.youtube.com/watch?v=wqeJ5Vkb6JE',
        thumbnail:
          'https://i2.wp.com/www.art-mine.com/collectorscorner/wp-content/uploads/2018/06/Tempting-Destiny.jpeg?resize=1200%2C820',
        title: 'Category2 Video'
      },
      {
        url: 'https://www.youtube.com/watch?v=wqeJ5Vkb6JE',
        thumbnail:
          'https://i2.wp.com/www.art-mine.com/collectorscorner/wp-content/uploads/2018/06/Tempting-Destiny.jpeg?resize=1200%2C820',
        title: 'Category2 Video'
      },
      {
        url: 'https://www.youtube.com/watch?v=wqeJ5Vkb6JE',
        thumbnail:
          'https://i2.wp.com/www.art-mine.com/collectorscorner/wp-content/uploads/2018/06/Tempting-Destiny.jpeg?resize=1200%2C820',
        title: 'Category2 Video'
      },
      {
        url: 'https://www.youtube.com/watch?v=wqeJ5Vkb6JE',
        thumbnail:
          'https://i2.wp.com/www.art-mine.com/collectorscorner/wp-content/uploads/2018/06/Tempting-Destiny.jpeg?resize=1200%2C820',
        title: 'Category2 Video'
      }
    ]
  }
];
class VideoTutorialListingsComponent extends Component {
  render() {
    const props = { categories };
    return (
      <VideoTutorialHomeWrapper>
        <VideoTutorialHomeContainer>
          <VideoLists {...props} />
          <SideBar {...props} />
        </VideoTutorialHomeContainer>
      </VideoTutorialHomeWrapper>
    );
  }
}

export default VideoTutorialListingsComponent;
