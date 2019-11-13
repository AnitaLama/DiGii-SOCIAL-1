import React, { Component } from 'react';
import {
  SideBarWrapper,
  SidebarCategoryWrapper,
  CategoryWrapper
} from './style';

class SideBar extends Component {
  render() {
    const { categories } = this.props;
    return (
      <SideBarWrapper>
        <div>search bar</div>
        <SidebarCategoryWrapper>
          {categories.map(category => (
            <CategoryWrapper>{category.videoCategoryName}</CategoryWrapper>
          ))}
        </SidebarCategoryWrapper>
      </SideBarWrapper>
    );
  }
}

export default SideBar;
