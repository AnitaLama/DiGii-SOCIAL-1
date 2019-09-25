import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NewPost, Posts, SideBar } from '../index';
import ReportActions from '../../../Redux/ReportRedux';
import { BodyWrapper } from './style';
import ReportNotifications from './reportNotifications';

class Body extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.report !== this.props.report) {
      const { report, disableTheReportNotification } = this.props;
      const { enableNotification } = report;
      if (enableNotification) {
        setTimeout(() => {
          disableTheReportNotification();
        }, 10000);
      }
    }
  }

  hideNotification = () => {
    const { disableTheReportNotification } = this.props;
    disableTheReportNotification();
  };

  render() {
    const { report } = this.props;
    const { enableNotification } = report;

    return (
      <BodyWrapper>
        <div>
          <NewPost />
          {enableNotification && (
            <ReportNotifications hideNotification={this.hideNotification} />
          )}
          <Posts />
        </div>
        <SideBar />
      </BodyWrapper>
    );
  }
}
Body.propTypes = {
  report: PropTypes.object,
  disableTheReportNotification: PropTypes.func
};
const mapStateToProps = state => ({
  report: state.report
});

const mapDispatchToProps = dispatch => ({
  disableTheReportNotification: () => dispatch(ReportActions.disableTheReportNotification())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Body);
