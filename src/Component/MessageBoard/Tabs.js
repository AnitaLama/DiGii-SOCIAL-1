import React, { Component } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { flexCentering, Colors, fontSize } from '../../Theme';
import history from '../../history';

const { primary, secondary, pencil } = Colors.colors;
const TabsWrapper = styled.div`
  ${flexCentering('column')};
  cursor: pointer;
`;
const Tab = styled.div`
  width: 50px;
  height: 50px;
  margin-top: 10px;
  border-radius: 12px;
  padding: 10px 6px;
  border: 4px solid ${pencil};
  &.active {
    border: 4px solid ${primary};
  }
`;
const Box = styled.div`
  background-image: linear-gradient(to right, ${pencil}, ${pencil});
  height: 12px;
  border-radius: 6px;
  &.active {
    background-image: linear-gradient(to right, ${primary}, ${secondary});
  }
`;
const TabName = styled.div`
  text-align: center;
  ${fontSize(8)}
`;
const SingleTab = props => {
  const { data, handleTabChange } = props;
  const selected = history.location.pathname === data.pathname;
  return (
    <div
      onClick={() => {
        handleTabChange(data);
      }}
    >
      <Tab className={selected && 'active'}>
        <Box className={selected && 'active'} />
      </Tab>
      <TabName>{data.tab}</TabName>
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
            handleTabChange={this.handleTabChange}
          />
        ))}
      </TabsWrapper>
    );
  }
}
SingleTab.propTypes = {
  data: PropTypes.object,
  handleTabChange: PropTypes.func
};
export default Tabs;
