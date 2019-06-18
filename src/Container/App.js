import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './Home';
import TestPage from './Test';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact strict component={HomePage} />
        <Route path="/tests" exact strict component={TestPage} />
      </Switch>
    );
  }
}

export default Routes;
