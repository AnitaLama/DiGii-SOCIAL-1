import React, { Component } from 'react';
import styled from '@emotion/styled';
import {
  NewPost, Posts, SideBar, ReportNotifications
} from './index';

const BodyWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto;
`;

class Body extends Component {
  state = {
    showReportNotifications: false
  };

  reportMade = () => {
    this.setState({ showReportNotifications: true }, () => {
      setTimeout(() => {
        this.setState({ showReportNotifications: false });
      }, 10000);
    });
  };

  hideNotification = () => {
    this.setState({ showReportNotifications: false });
  };

  render() {
    const { showReportNotifications } = this.state;
    return (
      <BodyWrapper>
        <div>
          <NewPost />
          {showReportNotifications && (
            <ReportNotifications hideNotification={this.hideNotification} />
          )}
          <Posts reportMade={this.reportMade} />
        </div>
        <SideBar />
      </BodyWrapper>
    );
  }
}

export { Body };
