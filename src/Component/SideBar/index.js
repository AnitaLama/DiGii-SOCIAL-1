import React, { Component } from 'react';
import styled from '@emotion/styled';
import { FaYoutube } from 'react-icons/fa';
import { Colors, fontSize, absoluteFixed } from '../../Theme';
import { Tabs } from '../MessageBoard';

const {
  primary, grey, secondary, pen, lightGrey
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
  border: 12px solid ${primary};
  border-radius: 40px;
  padding: 10px 20px;
  margin-bottom: 40px;
  min-height: 204px;
  position: relative;
`;
const Last = styled.div`
  background: ${lightGrey};
  min-height: 140px;
  margin: 10px 0;
  border-radius: 20px;
`;
const Icon = styled.span`
  color: ${secondary};
  ${fontSize(22)};
  margin-right: 10px;
`;
const GroupElement = styled.div`
  padding: 4px 0;
  ${fontSize(16)};
  color: ${grey};
  &:hover {
    cursor: pointer;
    span:first-of-type {
      color: ${primary};
    }
    span {
      color: ${pen};
    }
  }
`;
const Type = styled.span``;

const SideBarMenus = [
  { menu: 'Games', icon: <FaYoutube /> },
  { menu: 'Videos', icon: <FaYoutube /> },
  { menu: 'Tutorials', icon: <FaYoutube /> },
  { menu: 'Quizes', icon: <FaYoutube /> },
  { menu: 'Help', icon: <FaYoutube /> },
  { menu: 'Report', icon: <FaYoutube /> }
];
class SideBar extends Component {
  render() {
    return (
      <SideBarContainer>
        <SideBarWrapper>
          <GroupOne>
            {SideBarMenus.map((item, i) => (
              <GroupElement key={`menu${i}`}>
                <Icon>{item.icon}</Icon>
                <Type>{item.menu}</Type>
              </GroupElement>
            ))}
          </GroupOne>
          <GroupOne>
            <Last />
          </GroupOne>
        </SideBarWrapper>
        <Tabs />
      </SideBarContainer>
    );
  }
}

export default SideBar;
