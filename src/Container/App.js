import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { notification } from 'antd';
import NProgress from 'nprogress';
import { css } from '@emotion/core';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HomePage from './Home';
import StudentLogin from './StudentLogin';
import MessageBoard from './MessageBoard';
import UserProfile from './UserProfile';
import NeedHelp from './NeedHelp';
import ErrorPage from '../error';
import './styles.css';

const showTokenExpiredNotification = () => {
  notification.error({
    message: 'Token expired',
    description: 'Your token has expired.'
  });
};
const showNoTokenNotification = () => {
  notification.error({
    message: 'Log in',
    description: 'You need to login.'
  });
};
class ActualRoute extends React.Component {
  // componentWillMount() {
  //   console.log('cwm');
  //   NProgress.start();
  // }
  //
  // componentDidMount() {
  //   console.log('cdm');
  //   NProgress.done();
  // }
  //
  // componentWillUnmount() {
  //   console.log('cwu');
  //   NProgress.start();
  // }

  componentDidMount() {}

  render() {
    const token = localStorage.getItem('token');
    const { user } = this.props;

    if (token) {
      axios.defaults.headers.common.Authorization = token;
      const decodedToken = jwt_decode(token).exp;
      const currentDate = new Date().getTime() / 1000;
      if (decodedToken < currentDate) {
        showTokenExpiredNotification();
        if (user.isStudent) {
          return <Redirect to={{ pathname: '/student/login' }} />;
        }
        return <Redirect to={{ pathname: '/' }} />;
      }

      return <Route {...this.props} strict />;
    }
    axios.defaults.headers.common.Authorization = null;
    showNoTokenNotification();

    return <Redirect to={{ pathname: '/' }} />;
  }
}
const routes = [
  {
    title: 'MessageBoard',
    path: '/messageboard',
    component: MessageBoard
  },
  {
    title: 'Profile',
    path: '/userProfile/:isStudent/:user',
    component: UserProfile
  },
  {
    title: 'NeedHelp',
    path: '/askForHelp',
    component: NeedHelp
  }
];

const Routes = props => (
  <Switch
    className={css`
      #nprogress .bar {
        background: #f78360;
        height: 3px;
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        z-index: 1000;
      }

      #nprogress .peg {
        box-shadow: 0 0 10px #f78360, 0 0 5px #f78360;
      }

      #nprogress .spinner-icon {
        border-top-color: #f78360;
        border-left-color: #f78360;
      }
    `}
  >
    {routes.map(route => (
      <ActualRoute key={route.title} {...route} {...props} />
    ))}
    <Route path="/" component={HomePage} exact />
    <Route path="/student/login" component={StudentLogin} exact />
    <Route path="*" component={ErrorPage} />
  </Switch>
);
//
ActualRoute.propTypes = {
  user: PropTypes.object
};
const mapStateToProps = state => ({
  user: state.user.user
});
export default connect(mapStateToProps)(Routes);
