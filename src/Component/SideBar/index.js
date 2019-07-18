import React, { Component } from 'react';
import styled from '@emotion/styled';
import { FaRegTimesCircle } from 'react-icons/fa';
import { Colors, fontSize, Images } from '../../Theme';
import { Tabs } from '../MessageBoard';

const {
  blue, grey, pen, lightGrey
} = Colors.colors;
const SideBarContainer = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-columns: auto auto;
  margin: 10px 0;
`;
const SideBarWrapper = styled.div`
  margin: 0 20px;
  box-sizing: border-box;
`;
const GroupOne = styled.div`
  border: 12px solid ${blue};
  border-radius: 40px;
  padding: 10px 20px;
  margin-bottom: 40px;
  // min-height: 204px;
  position: relative;
`;
const Last = styled.div`
  background: ${lightGrey};
  min-height: 140px;
  margin: 10px 0;
  border-radius: 20px;
`;
const Icon = styled.img`
  margin-right: 10px;
  height: 20.99px;
`;
const GroupElement = styled.div`
  padding: 4px 0;
  ${fontSize(16)};
  color: ${grey};
  &:hover {
    cursor: pointer;
    span:first-of-type {
      color: ${blue};
    }
    span {
      color: ${pen};
    }
  }
`;
const Type = styled.span``;
const Title = styled.div`
  font-weight: bold;
`;
const Count = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
`;
const SideBarMenus = [
  { menu: 'Videos', icon: Images.digii5.Video },
  { menu: 'Tutorials', icon: Images.digii5.Video },
  { menu: 'Quizes', icon: Images.digii5.Quiz },
  { menu: 'Report', icon: Images.digii5.Video }
];
class SideBar extends Component {
  render() {
    return (
      <SideBarContainer>
        <SideBarWrapper>
          <GroupOne>
            {SideBarMenus.map((item, i) => (
              <GroupElement key={`menu${i}`}>
                <Icon src={item.icon} alt={`icon-${item.menu}`} />
                <Type>{item.menu}</Type>
              </GroupElement>
            ))}
          </GroupOne>
          <GroupOne>
            <Title>Report Meter</Title>
            <Count>
              <FaRegTimesCircle />
              <FaRegTimesCircle />
              <FaRegTimesCircle />
            </Count>
          </GroupOne>
        </SideBarWrapper>
        <Tabs />
      </SideBarContainer>
    );
  }
}

export default SideBar;
