import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
// import NProgress from 'nprogress';
import { css } from '@emotion/core';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import HomePage from './Home';
import StudentLogin from './StudentLogin';
import MessageBoard from './MessageBoard';
import UserProfile from './UserProfile';
import './styles.css';

class ActualRoute extends React.Component {
  // componentWillMount() {
  //   NProgress.start();
  // }
  //
  // componentWillUnmount() {
  //   NProgress.start();
  // }
  //
  // componentDidMount() {
  //   NProgress.done();
  // }

  render() {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common.Authorization = token;
      const decodedToken = jwt_decode(token).exp;
      const currentDate = new Date().getTime() / 1000;
      if (decodedToken < currentDate) {
        return <Redirect to={{ pathname: '/' }} />;
      }

      return <Route {...this.props} strict />;
    }
    axios.defaults.headers.common.Authorization = null;

    return <Redirect to={{ pathname: '/' }} />;
  }
}
const routes = [
  // {
  //   title: 'Login',
  //   path: '/',
  //   exact: true,
  //   component: HomePage
  // },
  // {
  //   title: 'Login',
  //   path: '/student/login',
  //   exact: true,
  //   component: StudentLogin
  // },
  {
    title: 'MessageBoard',
    path: '/messageboard',
    component: MessageBoard
  },
  {
    title: 'Profile',
    path: '/userProfile/:isStudent/:user',
    component: UserProfile
  }
];

const Routes = () => (
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
      <ActualRoute key={route.title} {...route} />
    ))}
    <Route path="/" component={HomePage} exact />
    <Route path="/student/login" component={StudentLogin} exact />
  </Switch>
);
//
export default Routes;
