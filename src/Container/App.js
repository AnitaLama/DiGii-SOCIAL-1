import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NProgress from 'nprogress';
import { css } from '@emotion/core';
import HomePage from './Home';
import MessageBoard from './MessageBoard';
import './styles.css';

class ActualRoute extends React.Component {
  componentWillMount() {
    NProgress.start();
  }

  componentDidMount() {
    NProgress.done();
  }

  render() {
    return <Route {...this.props} strict />;
  }
}
const routes = [
  {
    title: 'Login',
    path: '/',
    exact: true,
    component: HomePage
  },
  {
    title: 'MessageBoard',
    path: '/messageboard',
    component: MessageBoard
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
    {routes.map((route, i) => <ActualRoute key={i} {...route} />)}
  </Switch>
);

export default Routes;
