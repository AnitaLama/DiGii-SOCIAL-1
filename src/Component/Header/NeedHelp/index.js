import React, { Component } from 'react';
import styled from '@emotion/styled';
import { connect } from 'react-redux';
import { Badge } from 'antd';
import { WhiteButton } from '../../StyledComponents';
import { listArrowTop } from '../../../Theme';
import HelperActions from '../../../Redux/HelperRedux';

class NeedHelp extends Component {
  state = {
    showNotifications: false
  };

  componentWillMount() {
    const { onGetHelpNotificationsCount, user } = this.props;
    const { isStudent, id } = user;
    onGetHelpNotificationsCount({ isStudent, id });
  }

  onHover = () => {
    this.setState({ showNotifications: true });
  };

  onMouseLeave = () => {
    this.setState({ showNotifications: false });
  };

  render() {
    const { goToNeedHelpPage, helper, user } = this.props;
    const { showNotifications } = this.state;
    const { isStudent } = user;
    // console.log('helper >>>>', isStudent);
    // helper.map(item=>[
    //   //console.log(item.notifi);
    // ])
    const notificationCount = helper.reduce(
      (accumulator, item) => (!item.notificationRead ? accumulator + 1 : accumulator + 0),
      0
    );
    // console.log('count', notificationCount);
    if (isStudent) {
      return (
        <WhiteButton
          className="roundedShadow"
          onClick={goToNeedHelpPage}
          onMouseEnter={this.onHover}
          onMouseLeave={this.onMouseLeave}
          style={{
            fontWeight: 'bold',
            minWidth: '110px'
          }}
        >
          Need Help?
        </WhiteButton>
      );
    }
    return <div />;
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
  helper: state.helper.helpNotifications
});
const mapDispatchToProps = dispatch => ({
  onGetHelpNotificationsCount: value => dispatch(HelperActions.onGetHelpNotificationsCount(value))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NeedHelp);
