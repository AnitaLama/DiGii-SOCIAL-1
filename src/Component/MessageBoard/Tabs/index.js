import React, { Component } from 'react';
import PropTypes from 'prop-types';
import history from '../../../history';
import {
  TabsWrapper, Tab, Box, TabName
} from './style';

const SingleTab = props => {
  const { data } = props;
  const selected = history.location.pathname === data.pathname;
  return (
    <div>
      <Tab className={selected && 'active'}>
        <Box className={selected && 'active'} />
      </Tab>
      <TabName className={selected && 'active'}>{data.tab}</TabName>
    </div>
  );
};

const TabsList = [
  { tab: 'Home', pathname: '/messageboard' },
  { tab: 'Others', pathname: '' }
];
class Tabs extends Component {
  handleTabChange = selectedTab => {
    console.log(selectedTab);
  };

  render() {
    return (
      <TabsWrapper>
        {TabsList.map((item, i) => (
          <SingleTab
            key={`tab${i}`}
            data={item}
            onClick={() => {
              this.handleTabChange(item);
            }}
          />
        ))}
      </TabsWrapper>
    );
  }
}
SingleTab.propTypes = {
  data: PropTypes.object
};
export default Tabs;
