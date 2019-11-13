import styled from '@emotion/styled';
import { Colors } from '../../Theme';

const { snow } = Colors.colors;
export const VideoTutorialHomeWrapper = styled.div``;
export const VideoTutorialHomeContainer = styled.div``;

export const VideoListsWrapper = styled.div`
  width: 70%;
  float: left;
`;
export const SideBarWrapper = styled.div`
  float: left;
  width: 30%;
  padding: 2.5%;
`;

export const SidebarCategoryWrapper = styled.div`
  background: transparent linear-gradient(235deg, #61bbf7 0%, #9a4bf5 100%) 0%
    0% no-repeat padding-box;
  box-shadow: 4px 3px 6px #00000030;
  border-radius: 27px;
  padding: 20px;
`;

export const CategoryWrapper = styled.div`
  background: ${snow} 0% 0% no-repeat padding-box;
  border-radius: 17px;
  margin: 10px 0;
  padding: 6px 10px;
  font: Black 12px/15px Filson Soft;
`;

export const VideoCategoryWrapper = styled.div``;
export const CategoryTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  span.title {
    font: Black 24px/28px Filson Soft;
  }
`;
export const ViewMore = styled.span`
  background: transparent linear-gradient(259deg, #61bbf7 0%, #9a4bf5 100%) 0%
    0% no-repeat padding-box;
  box-shadow: 4px 3px 6px #00000030;
  border-radius: 27px;
  padding: 6px 10px;
  color: ${snow};
`;

export const CategoryList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  // display: flex;
  // align-items: center;
  // flex-wrap: wrap;
`;
export const VideoWrapper = styled.div`
  padding: 10px;
`;
export const Thumbnail = styled.div`
  background: ${props => `url(${props.thumbnail})`};

  height: 120px;
  border-radius: 14px;
`;
export const VideoTitle = styled.div`
  font: #383d3b 16px/20px Filson Soft;
`;
